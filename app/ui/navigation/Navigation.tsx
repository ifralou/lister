import React from 'react';
import AuthButton from "@/components/AuthButton";
import PersistStatus from "@/app/ui/dashboard/PersistStatus";

const Navigation = () => {
    return (
        <nav className={"w-full h-15 p-2"}>
            <AuthButton/>
            <PersistStatus/>
        </nav>
    );
};

export default Navigation;