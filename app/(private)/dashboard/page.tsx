"use client";
import Dashboard from "@/app/ui/dashboard/Dashboard";
import {NextUIProvider} from "@nextui-org/react";

const Page = () => {

    return (
        <NextUIProvider className="flex flex-grow">
            <Dashboard/>
        </NextUIProvider>
    );
};

export default Page;