import {useState} from "react";
import CreateTaskSelector from "@/app/ui/task/CreateTaskSelector";
import SunIcon from "@/app/assets/SunIcon";
import {DropdownItem} from "@nextui-org/react";
import InputRow from "@/app/ui/InputRow";
import {usePersistence} from "@/utils/state/persistance";

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

    const { addTask } = usePersistence();

    const [active, setActive] = useState(false);

    const [task, setTask] = useState(initState);


    async function submitTasks() {
        if(task.title == "") {
            return;
        }
        addTask(task.title);
        setTask(initState);
    }



    return <InputRow inputValue={task.title}
                     onInputChange={(e) => setTask(p => ({...p, title: e.target.value}))}
                     isActive={ task?.title?.length > 0 }
                     onSubmit={submitTasks}
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