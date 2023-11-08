import React from 'react';
import {Button, Dropdown, DropdownMenu, DropdownTrigger} from "@nextui-org/react";
import {CollectionChildren} from "@react-types/shared";

type CreateTaskSelectorProps = {
    icon: any,
    children: CollectionChildren<any>,
    label?: string
}
const CreateTaskSelector = (
    {icon, children, label} : CreateTaskSelectorProps
) => {
    return (
        <Dropdown>
            <DropdownTrigger>
                <Button size={'sm'} radius={"none"} variant={"light"}
                        isIconOnly={!label}
                        className="px-1 py-5 m-0 "
                >
                    {icon} {label}
                </Button>
            </DropdownTrigger>
            <DropdownMenu>
                { children }
            </DropdownMenu>
        </Dropdown>
    );
};

export default CreateTaskSelector;