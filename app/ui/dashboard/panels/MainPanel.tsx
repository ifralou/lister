import {useDispatch, useSelector} from "react-redux";
import {increment} from "@/utils/redux/slices/taskSlice";
import CreateTask from "@/app/ui/task/CreateTask";

const MainPanel = () => {
    const count = useSelector((state) => state.counter.value)
    const dispatch = useDispatch();

    return (
        <>
            <div>{count}</div>
            <button onClick={() => dispatch(increment())}
            >increment</button>
            <CreateTask lists={["My Day", "My custom list 1", "My custom list 2"]}/>
        </>
    );
};

export default MainPanel;