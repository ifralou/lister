"use client"
import {Panel, PanelGroup, PanelResizeHandle} from "react-resizable-panels";
import ListsPanel from "@/app/ui/dashboard/panels/ListsPanel";
import MainPanel from "@/app/ui/dashboard/panels/MainPanel";
import TaskPanel from "@/app/ui/dashboard/panels/TaskPanel";
import {useMutation, useQuery} from "react-query";
import {addTask, getTasks} from "@/utils/state/queries";


const Dashboard = ()=> {
    const { isLoading, error, data } = useQuery(
        'userTasks', getTasks
    );

    console.log(data);

    if(isLoading) {
        return <h1>Loading query...</h1>
    }

    if(error) {
        return <h1>Error here</h1>
    }

    return (
        <PanelGroup direction={"horizontal"} className={""}>
            <Panel defaultSize={20} className={"min-w-[150px] max-w-[300px]"}>
                <ListsPanel/>
            </Panel>
            <PanelResizeHandle>
                <div className="w-1 bg-gray-400 h-full"></div>
            </PanelResizeHandle>
            <Panel defaultSize={55}>
                <MainPanel tasks={data || []}/>
            </Panel>
            <PanelResizeHandle>
                <div className="w-1 bg-gray-400 h-full"></div>
            </PanelResizeHandle>
            <Panel defaultSize={25}>
                <TaskPanel/>
            </Panel>
        </PanelGroup>
    );
};

export default Dashboard;