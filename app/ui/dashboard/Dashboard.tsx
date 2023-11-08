"use client"
import {Panel, PanelGroup, PanelResizeHandle} from "react-resizable-panels";
import ListsPanel from "@/app/ui/dashboard/panels/ListsPanel";
import MainPanel from "@/app/ui/dashboard/panels/MainPanel";
import TaskPanel from "@/app/ui/dashboard/panels/TaskPanel";
import {useQuery} from "react-query";
import {getTasks} from "@/utils/state/queries";
import {useState} from "react";


const Dashboard = ()=> {
    const { isLoading, error, data } = useQuery(
        'userTasks', getTasks
    );
    const [selectedTask, setSelectedTask] = useState<Set<string>>(new Set());

    if(isLoading) {
        return <h1>Loading query...</h1>
    }

    if(error) {
        return <h1>Error here</h1>
    }

    return (
        <PanelGroup direction={"horizontal"} className={"flex flex-grow"}>

            <Panel defaultSize={20} className={"min-w-[150px] max-w-[300px] flex-grow"}>
                <ListsPanel/>
            </Panel>

            <PanelResizeHandle>
                <div className="w-1 bg-gray-400 h-full flex-grow"></div>
            </PanelResizeHandle>

            <Panel defaultSize={55}>
                <MainPanel tasks={data || []} onTaskSelection={setSelectedTask} selectedTask={selectedTask}/>
            </Panel>

            {
                selectedTask && selectedTask.size != 0 &&
                <>

                <PanelResizeHandle>
                    <div className="w-1 bg-gray-400 h-full"></div>
                </PanelResizeHandle>

                <Panel defaultSize={25} className={"min-w-[250px] max-w-[500px]"}>
                    <TaskPanel task={data?.filter(d => d.id == selectedTask.values().next().value)[0]}
                               onPanelClose={() => setSelectedTask(new Set())}
                    />
                </Panel>

                </>
            }
        </PanelGroup>
    );
};

export default Dashboard;