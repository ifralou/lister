'use client'

import React from "react";
import AppListItem from "@/app/ui/dashboard/applists/AppListItem";
import {IconKeys} from "next/dist/lib/metadata/constants";

const AppListItems = [
    {label: "My Day", icon: null },
    {label: "Important", icon: null },
    {label: "Planned", icon: null},
    {label: "Assigned", icon: null},
    {label: "Tasks", icon: null},
]

const Navigation = () => {
    const activeTab = "myday";
    return (
        <article className="w-full">

            <div className="p-2 bg-gray-900">
                <img/>
                <div>
                    <h2>name</h2>
                    <p>surname</p>
                </div>
            </div>

            <div>
                {
                    AppListItems.map(({label, icon}) =>
                        <AppListItem key={label} label={label} icon={icon} count={0} isActive={label.split(" ").join("").toLowerCase() == activeTab}/>
                    )
                }
            </div>

        </article>
    );
};

export default Navigation;