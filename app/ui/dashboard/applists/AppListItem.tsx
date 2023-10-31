import React from 'react';
import {Icon} from "next/dist/lib/metadata/types/metadata-types";

type AppListItemProps = {
    icon: Icon,
    label: string,
    count: number,
    isActive: boolean
}

const ActiveMark = () => <div className={"absolute w-1 h-1/2 bg-green-300"}></div>
const AppListItem = (
    {icon, label, count, isActive} : AppListItemProps
) => {
    return (
        <li className={`
        p-2 hover:bg-gray-700
        flex justify-between
        relative
        `}>
            {isActive && <ActiveMark/>}
            {/*icon here*/}
            <h3 className="ml-2">{label}</h3>
            <div>{count}</div>
        </li>
    );
};

export default AppListItem;