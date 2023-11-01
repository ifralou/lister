"use client"
import {Panel, PanelGroup, PanelResizeHandle} from "react-resizable-panels";
import ListsPanel from "@/app/ui/dashboard/panels/ListsPanel";
import MainPanel from "@/app/ui/dashboard/panels/MainPanel";
import TaskPanel from "@/app/ui/dashboard/panels/TaskPanel";
import {Provider} from "react-redux";
import store from "@/utils/redux/store";

const Dashboard = () => {
    return (
        <Provider store={store}>
            <PanelGroup direction={"horizontal"} className={"flex-grow"}>
                <Panel defaultSize={20} className={"min-w-[150px] max-w-[300px]"}>
                    <ListsPanel/>
                </Panel>
                <PanelResizeHandle>
                    <div className="w-1 bg-gray-400 h-full"></div>
                </PanelResizeHandle>
                <Panel defaultSize={55}>
                    <MainPanel/>
                </Panel>
                <PanelResizeHandle>
                    <div className="w-1 bg-gray-400 h-full"></div>
                </PanelResizeHandle>
                <Panel defaultSize={25}>
                    <TaskPanel/>
                </Panel>
            </PanelGroup>
        </Provider>
    );
};

export default Dashboard;