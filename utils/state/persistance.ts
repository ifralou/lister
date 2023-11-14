import {Task} from "@/utils/common/commontypes";
import {create, StateCreator} from "zustand";
import Error from "next/error";

interface ClientState {
    tasks: Task[]
    addTaskClient: (task: Task) => void;
    removeTaskClient: (taskId: number) => void;
    addStepClient: (step: string, taskId: number) => void;
}

type OK = { type: "ok" }
type ERROR = { type: "error", error: Error}
type LOADING = { type: "loading"}
type Status = OK | ERROR | LOADING


interface PushingState {
    status : Status,
    setLoading: () => void;
    setError: (e: Error) => void;
    setOk: () => void;
    synchronizeActions: (clientFunction: () => void, asyncActionPromise: Promise<any>) => void
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
        asyncActionPromise.then(() => {
            //Check status codes and so on
            get().setOk();
        }).catch((e) => get().setError(e))
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
    addTask: (task: Task) => void;
    removeTask: (taskId: number) => void;
    addStep: (step: string, taskId: number) => void;
}


const createDataEngine: StateCreator<
    ClientState & PushingState, [], [], DataEngine
> = (set, get) => ({
    addTask: (task: Task) => {
        get().synchronizeActions(
            get().addTaskClient.bind(null, task),
            //TODO: add supabase handler
            Promise.resolve()
        )
    },

    removeTask: (taskId: number) => {
        get().synchronizeActions(
            get().removeTaskClient.bind(null, taskId),
            Promise.resolve()
        )
    },

    addStep: (step: string, taskId: number) => {
        get().synchronizeActions(
            get().addStepClient.bind(null, step, taskId),
            Promise.resolve()
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
export function usePersistence() : DataEngine {
    return useDataStore();
}

export function usePushStatus() : Status {
    return useDataStore(state => state.status);
}