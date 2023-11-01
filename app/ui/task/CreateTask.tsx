import {useState} from "react";
import CreateTaskActive from "@/app/assets/CreateTaskActive";
import CreateTaskNonActive from "@/app/assets/CreateTaskNonActive";
import CreateTaskSelector from "@/app/ui/task/CreateTaskSelector";

type CreateTaskProps = {
    lists: string[]
};
const CreateTask = ({lists} : CreateTaskProps) => {
    const [active, setActive] = useState(false);

    const [task, setTask] = useState({
        title: "",
        list: "Tasks",
        dueDate: "",
        remindDate: "",
        repeatMode: ""
    });

    const isActive = () => task?.title?.length > 0

    console.log(task);


    return (
        <div className={`
        flex items-center px-2
        border-2 border-green-500 rounded-xl
        overflow-hidden
        ${active ? "bg-gray-500" : "bg-gray-900"}
       `}
        >
            {isActive() ? <CreateTaskActive/> : <CreateTaskNonActive/>}
            <input placeholder={ active?  "Example: finish lister" : "Add task"}
                   className={"p-2 bg-transparent outline-none"}
                   value={task.title} onChange={(e) => setTask(p => ({...p, title: e.target.value}))}
                   onFocus={() => setActive(true)}
                   onBlur={() => setActive(false)}
            />
            {
                isActive() && <div className={"flex"}>
                    <CreateTaskSelector options={lists}
                                        onChange={(e) =>  { setTask(p => ({...p, list: e.target.value})) }}
                    />

                    <CreateTaskSelector options={lists}
                                        onChange={(e) =>  { setTask(p => ({...p, list: e.target.value})) }}
                    />

                    <CreateTaskSelector options={lists}
                                        onChange={(e) =>  { setTask(p => ({...p, list: e.target.value})) }}
                    />

                    <CreateTaskSelector options={lists}
                                        onChange={(e) =>  { setTask(p => ({...p, list: e.target.value})) }}
                    />
                </div>
            }
        </div>
    );
};

export default CreateTask;