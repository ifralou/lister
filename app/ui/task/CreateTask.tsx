import {useState} from "react";
import CreateTaskSelector from "@/app/ui/task/CreateTaskSelector";
import SunIcon from "@/app/assets/SunIcon";
import {addTask} from "@/utils/state/queries";
import {DropdownItem} from "@nextui-org/react";
import InputRow from "@/app/ui/InputRow";

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

    const [active, setActive] = useState(false);

    const [task, setTask] = useState(initState);


    async function submitTasks() {
        if(task.title == "") {
            return;
        }
        await addTask({title: task.title});
        setTask(initState);
    }



    return <InputRow inputValue={task.title}
                     onInputChange={(e) => setTask(p => ({...p, title: e.target.value}))}
                     isActive={ task?.title?.length > 0 }
                     onSubmit={
                        () => {}
                        //TODO: create task
                     }
                     placeholders={{active: "Add task", passive: "Ex: Finish Lister styling"}}
    >
        <div className={"flex overflow-hidden min-w-[160px]"}>
            <CreateTaskSelector icon={<SunIcon/>} label={"Tasks"}>
                {
                    ["Tasks", "My day", "Important"].map(task =>
                        <DropdownItem key={task}>
                            {task}
                        </DropdownItem>
                    )
                }
            </CreateTaskSelector>

            <CreateTaskSelector icon={<SunIcon/>}>
                {
                    ["Tasks", "My day", "Important"].map(task =>
                        <DropdownItem key={task}>
                            {task}
                        </DropdownItem>
                    )
                }
            </CreateTaskSelector>

            <CreateTaskSelector icon={<SunIcon/>}>
                {
                    ["Tasks", "My day", "Important"].map(task =>
                        <DropdownItem key={task}>
                            {task}
                        </DropdownItem>
                    )
                }
            </CreateTaskSelector>

            <CreateTaskSelector icon={<SunIcon/>}>
                {
                    ["Tasks", "My day", "Important"].map(task =>
                        <DropdownItem key={task}>
                            {task}
                        </DropdownItem>
                    )
                }
            </CreateTaskSelector>
        </div>
    </InputRow>
};

export default CreateTask;