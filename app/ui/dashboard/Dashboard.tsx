"use client"
import {Panel, PanelGroup, PanelResizeHandle} from "react-resizable-panels";
import ListsPanel from "@/app/ui/dashboard/panels/ListsPanel";
import MainPanel from "@/app/ui/dashboard/panels/MainPanel";
import TaskPanel from "@/app/ui/dashboard/panels/TaskPanel";
import {useState} from "react";
import {usePersistence} from "@/utils/state/persistance";


const Dashboard = ()=> {
    const [selectedTask, setSelectedTask] = useState<Set<string>>(new Set());

    const { tasks} = usePersistence();

    return (
        <PanelGroup direction={"horizontal"} className={"flex flex-grow"}>

            <Panel defaultSize={20} className={"min-w-[150px] max-w-[300px] flex-grow"}>
                <ListsPanel/>
            </Panel>

            <PanelResizeHandle>
                <div className="w-1 bg-gray-400 h-full flex-grow"></div>
            </PanelResizeHandle>

            <Panel defaultSize={55}>
                <MainPanel tasks={tasks} onTaskSelection={setSelectedTask} selectedTask={selectedTask}/>
            </Panel>

            {
                selectedTask && selectedTask.size != 0 &&
                <>

                <PanelResizeHandle>
                    <div className="w-1 bg-gray-400 h-full"></div>
                </PanelResizeHandle>

                <Panel defaultSize={25} className={"min-w-[250px] max-w-[500px]"}>
                    <TaskPanel task={tasks?.filter(d => d.id == selectedTask.values().next().value)[0]}
                               onPanelClose={() => setSelectedTask(new Set())}
                    />
                </Panel>

                </>
            }
        </PanelGroup>
    );
};

export default Dashboard;