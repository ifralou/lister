import CreateTask from "@/app/ui/task/CreateTask";
import {Listbox, ListboxItem, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@nextui-org/react";
import {Dispatch, SetStateAction} from "react";

type MainPanelProps = {
    tasks: any[],
    selectedTask: Set<string>,
    onTaskSelection: Dispatch<SetStateAction<any>>
}
const MainPanel = ({tasks, selectedTask, onTaskSelection} : MainPanelProps) => {
    console.log('MainPanel: selected task', selectedTask)
    return (
        <section className={"px-4"}>
            <Listbox className={"pb-4"}
                   selectionMode={"single"}
                   disallowEmptySelection
                   selectedKeys={selectedTask || ""}
                   onSelectionChange={onTaskSelection}
            >
                {
                    tasks.map(task  =>
                        <ListboxItem key={task.id}>
                            {task.title}
                        </ListboxItem>
                    )
                }
            </Listbox>
            <CreateTask lists={["My Day", "My custom list 1", "My custom list 2"]}/>
        </section>
    );
};

export default MainPanel;