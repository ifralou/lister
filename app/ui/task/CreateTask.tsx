import {useState} from "react";
import CreateTaskActive from "@/app/assets/CreateTaskActive";
import CreateTaskNonActive from "@/app/assets/CreateTaskNonActive";
import CreateTaskSelector from "@/app/ui/task/CreateTaskSelector";
import SunIcon from "@/app/assets/SunIcon";
import {addTask} from "@/utils/state/queries";
import {useMutation, useQueryClient} from "react-query";

type CreateTaskProps = {
    lists: string[]
};

const initState = {
    title: "",
    list: "Tasks",
    dueDate: "",
    remindDate: "",
    repeatMode: ""
}

const CreateTask = ({lists}: CreateTaskProps) => {
    const queryClient = useQueryClient();

    const [active, setActive] = useState(false);

    const [task, setTask] = useState(initState);

    const mutation = useMutation({
        mutationFn: () => {
            return submitTasks();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['userTasks']})
        }
    });


    async function submitTasks() {
        if(task.title == "") {
            return;
        }
        await addTask({title: task.title});
        setTask(initState);
    }

    async function submitOnEnter(e: any) {
        if(e.key === "Enter") {
            mutation.mutate();
        }
    }

    const isActive = () => task?.title?.length > 0

    return (
        <div className={`
        flex justify-between items-center px-2
        border-2 border-green-500 rounded-xl
        overflow-hidden
        ${active ? "bg-gray-500" : "bg-gray-900"}
       `}
        >
            <div className={`flex items-center`}>
                <div onClick={() => mutation.mutate()}>
                    {isActive() ? <CreateTaskActive/> : <CreateTaskNonActive/>}
                </div>
                <input placeholder={active ? "Example: finish lister" : "Add task"}
                       onKeyDown={submitOnEnter}
                       className={"p-2 bg-transparent outline-none"}
                       value={task.title} onChange={(e) => setTask(p => ({...p, title: e.target.value}))}
                       onFocus={() => setActive(true)}
                       onBlur={() => setActive(false)}
                />
            </div>
            {
                isActive() && <div className={`flex`}>

                    <CreateTaskSelector options={lists}
                                        icon={<SunIcon/>}
                                        onChange={(e) => {
                                            setTask(p => ({...p, list: e.target.value}))
                                        }}
                    />

                    <CreateTaskSelector options={lists}
                                        icon={<SunIcon/>}
                                        onChange={(e) => {
                                            setTask(p => ({...p, list: e.target.value}))
                                        }}
                    />

                    <CreateTaskSelector options={lists}
                                        icon={<SunIcon/>}
                                        onChange={(e) => {
                                            setTask(p => ({...p, list: e.target.value}))
                                        }}
                    />

                    <CreateTaskSelector options={lists}
                                        icon={<SunIcon/>}
                                        onChange={(e) => {
                                            setTask(p => ({...p, list: e.target.value}))
                                        }}
                    />
                </div>
            }
        </div>
    );
};

export default CreateTask;