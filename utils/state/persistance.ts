import {Task} from "@/utils/common/commontypes";
import {create, StateCreator} from "zustand";
import {v4 as generateUUID} from "uuid"
import {createClient} from "@/utils/supabase/client";
import {PostgrestFilterBuilder} from "@supabase/postgrest-js";
import {PostgrestError} from "@supabase/supabase-js";
import {UUID} from "crypto";
import {useEffect} from "react";

interface ClientState {
    tasks: Task[]
    initStoreClient: (tasks: Task[]) => void;
    addTaskClient: (task: Task) => void;
    removeTaskClient: (taskId: UUID) => void;
    addStepClient: (step: string, taskId: UUID) => void;
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
            console.log("SyncActions: ", res);
            if(res.error) {
                get().setError(res.error)
            } else {
                get().setOk();
            }
        })
    }
})


const createClientStateSlice: StateCreator<ClientState, [], [], ClientState> = (set, get) => ({
    tasks: [],

    initStoreClient: (tasks: Task[]) => set((state) => ({
            ...state, tasks
    })),

    addTaskClient: (task: Task) => {
        set((state ) => ({
            ...state, tasks: [...state.tasks, task]
        }));
    },

    removeTaskClient: (taskId: UUID) => set((state) => ({
        ...state, tasks: state.tasks.filter(t => t.id != taskId)
    })),

    addStepClient: (step: string, taskId: UUID) => set((state) => {
        const taskToUpdate = state.tasks.find(t => t.id == taskId) as Task;
        const nonUpdated =  state.tasks.filter(t => t.id != taskId);
        const updatedTask = {...taskToUpdate, steps: [...taskToUpdate.steps, step]};

        return {
            ...state, tasks: [...nonUpdated, updatedTask]
        };
    }),

});

interface DataEngine {
    initStore: () => void;
    addTask: (title: string) => void;
    removeTask: (taskId: string) => void;
    addStep: (step: string, taskId: string) => void;
}


const createDataEngine: StateCreator<
    ClientState & PushingState, [], [], DataEngine
> = (set, get) => ({
    initStore: async () => {
        get().setLoading();
        const {data, error} = await supabase.from("tasks").select();
        if(error) {
            get().setError(error);
        } else {
            get().initStoreClient(data as Task[]);
            get().setOk();
        }
    },

    addTask: async (title: string) => {

        const task = {
            id: generateUUID(),
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

    removeTask: (taskId: string) => {
        get().synchronizeActions(
            get().removeTaskClient.bind(null, taskId),
            supabase.from(tasks).select()
        )
    },

    addStep: (step: string, taskId: string) => {
        get().synchronizeActions(
            get().addStepClient.bind(null, step, taskId),
            supabase.rpc("append_step", {
                task_id: taskId,
                step: step
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
    const data = useDataStore();

    useEffect(() => {
        data.initStore()
    }, []);

    return data;
}

export function usePushStatus() : Status {
    return useDataStore(state => state.status);
}