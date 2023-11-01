'use client'

import React from "react";
import AppListItem from "@/app/ui/dashboard/applists/AppListItem";
import SunIcon from "@/app/assets/SunIcon";

const AppListItems = [
    {label: "My Day", icon: <SunIcon/>},
    {label: "Important", icon: <SunIcon/>},
    {label: "Planned", icon: <SunIcon/>},
    {label: "Assigned", icon: <SunIcon/>},
    {label: "Tasks", icon: <SunIcon/>},
]

const ListsPanel = () => {
    const activeTab = "myday";
    return (
        <article className="w-full">
            <div>
                {
                    AppListItems.map(({label, icon}) =>
                        <AppListItem key={label} label={label} icon={icon} count={0} isActive={label.split(" ").join("").toLowerCase() == activeTab}/>
                    )
                }
            </div>
            <div>

            </div>
        </article>
    );
};

export default ListsPanel;