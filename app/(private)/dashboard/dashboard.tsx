"use client"
import {Panel, PanelGroup, PanelResizeHandle} from "react-resizable-panels";
import Navigation from "@/app/ui/dashboard/Navigation";
import MainPanel from "@/app/ui/dashboard/MainPanel";
import TaskPanel from "@/app/ui/dashboard/TaskPanel";

const Dashboard = () => {
    return (
        <>
            <PanelGroup direction={"horizontal"}>
                <Panel defaultSize={20} className={"min-w-[150px]"}>
                    <Navigation/>
                </Panel>
                <PanelResizeHandle>
                    <div className="w-2 bg-gray-400 h-screen"></div>
                </PanelResizeHandle>
                <Panel defaultSize={55}>
                    <MainPanel/>
                </Panel>
                <PanelResizeHandle>
                    <div className="w-2 bg-gray-400 h-screen"></div>
                </PanelResizeHandle>
                <Panel defaultSize={25}>
                    <TaskPanel/>
                </Panel>
            </PanelGroup>
        </>
    );
};

export default Dashboard;