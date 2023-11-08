import {Card, CardHeader} from "@nextui-org/card";
import {Task} from "@/utils/common/commontypes";
import {Button, Listbox, ListboxItem} from "@nextui-org/react";
import CreateTask from "@/app/ui/task/CreateTask";
import CreateStep from "@/app/ui/task/CreateStep";

type TaskPanelProp = {
    task: Task,
    onPanelClose: () => void
}
const TaskPanel = ({task, onPanelClose} : TaskPanelProp) => {
    if(!task) {
        return <h1>Loading...</h1>
    }

    const { steps } = task;
    console.log("TaskPanel", task);

    return (
        <Card className={"mx-4"}>
            <CardHeader className={"flex flex-col"}>
                <div className={"flex flex-row justify-between items-center"}>
                    <h2 className={"text-xl font-semibold"}>
                        {task.title}
                    </h2>
                    <Button onClick={() => onPanelClose()}>Close</Button>
                </div>
                <div>
                    {
                        steps && steps.map(step => <div key={step}>{step}</div>)
                    }
                    <CreateStep/>
                </div>
            </CardHeader>

        </Card>
    );
};

export default TaskPanel;