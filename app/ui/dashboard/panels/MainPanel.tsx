import CreateTask from "@/app/ui/task/CreateTask";

type MainPanelProps = {
    tasks: any[]
}
const MainPanel = ({tasks} : MainPanelProps) => {
    return (
        <>
            <div>
                {
                    tasks.map(task  => <div key={task.title}>{JSON.stringify(task)}</div>)
                }
            </div>
            <CreateTask lists={["My Day", "My custom list 1", "My custom list 2"]}/>
        </>
    );
};

export default MainPanel;