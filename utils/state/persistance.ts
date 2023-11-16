import {Task} from "@/utils/common/commontypes";
import {create, StateCreator} from "zustand";
import Error from "next/error";
import {createClient} from "@/utils/supabase/client";
import {PostgrestFilterBuilder} from "@supabase/postgrest-js";
import {PostgrestError} from "@supabase/supabase-js";

interface ClientState {
    tasks: Task[]
    addTaskClient: (task: Task) => void;
    removeTaskClient: (taskId: number) => void;
    addStepClient: (step: string, taskId: number) => void;
}

type OK = { type: "ok" }
type ERROR = { type: "error", error: PostgrestError}
type LOADING = { type: "loading"}
type Status = OK | ERROR | LOADING

const supabase = createClient();

const tasks = "tasks";

interface PushingState {
    status : Status,
    setLoading: () => void;
    setError: (e: PostgrestError) => void;
    setOk: () => void;
    synchronizeActions: (clientFunction: () => void, asyncActionPromise: PostgrestFilterBuilder<any, any, unknown>) => void
}

const createPushingStateSlice: StateCreator<
    PushingState, [], [], PushingState
> = (set, get) => ({
    status: { type: "ok"},

    setOk: () => set((state) => ({...state, status: { type: 'ok'}})),
    setError: (e) => set((state) => ({...state, status: {type: "error", error: e}})),
    setLoading: () => set((state) => ({...state, status: {type: "loading"}})),


    synchronizeActions: (clientFunction, asyncActionPromise) => {
        get().setLoading();
        clientFunction();
        asyncActionPromise.then((res) => {
            console.log(res);
            if(res.error) {
                get().setError(res.error)
            } else {
                get().setOk();
            }
        })
    }
})


const createClientStateSlice: StateCreator<ClientState, [], [], ClientState> = (set) => ({
    tasks: [],

    addTaskClient: (task: Task) => {
        set((state ) => ({
            ...state, tasks: [...state.tasks, task]
        }));
    },

    removeTaskClient: (taskId: number) => set((state) => ({
        ...state, tasks: state.tasks.filter(t => t.id != taskId)
    })),

    addStepClient: (step: string, taskId: number) => set((state) => {
        const taskToUpdate = state.tasks.find(t => t.id == taskId) as Task;
        const nonUpdated =  state.tasks.filter(t => t.id != taskId);
        const updatedTask = {...taskToUpdate, steps: [...taskToUpdate.steps, step]};

        return {
            ...state, tasks: [...nonUpdated, updatedTask]
        };
    }),

});

interface DataEngine {
    addTask: (title: string) => void;
    removeTask: (taskId: number) => void;
    addStep: (step: string, taskId: number) => void;
}


const createDataEngine: StateCreator<
    ClientState & PushingState, [], [], DataEngine
> = (set, get) => ({
    addTask: async (title: string) => {

        const task = {
            id: null,
            title,
            steps: [],
            build_in_lists: [],
            user_list: null,
            assignee_id: null,
            repeat_timestamp: null,
            due_timestamp: null,
            remind_timestamp: null
        };

        get().synchronizeActions(
            get().addTaskClient.bind(null, task),
            supabase.from(tasks).insert(task)
        )
    },

    removeTask: (taskId: number) => {
        get().synchronizeActions(
            get().removeTaskClient.bind(null, taskId),
            supabase.from(tasks).select()
        )
    },

    addStep: (step: string, taskId: number) => {
        get().synchronizeActions(
            get().addStepClient.bind(null, step, taskId),
            supabase.rpc("append_step", {
                id: taskId, step
            })
        )
    }
});

const useDataStore = create<ClientState & PushingState & DataEngine>()((...a) => ({
    ...createClientStateSlice(...a),
    ...createPushingStateSlice(...a),
    ...createDataEngine(...a)
}));


/**
 * Central hook for state app management.
 * Synchronizes app client state and db.
 */
export function usePersistence() : DataEngine & { tasks: Task[] }{
    return useDataStore();
}

export function usePushStatus() : Status {
    return useDataStore(state => state.status);
}