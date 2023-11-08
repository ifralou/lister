type TaskItemProps = {
    task: string
}
const TaskItem = ({task}: TaskItemProps) => {
    return (
        <div>
            {
                JSON.stringify(task)
            }
        </div>
    );
};

export default TaskItem;