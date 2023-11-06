"use client";
import Dashboard from "@/app/ui/dashboard/Dashboard";
import {QueryClient, QueryClientProvider} from "react-query";
import {NextUIProvider} from "@nextui-org/react";

const queryClient = new QueryClient();
const Page = () => {

    return (
        <QueryClientProvider client={queryClient}>
            <NextUIProvider className="flex flex-grow">
                <Dashboard/>
            </NextUIProvider>
        </QueryClientProvider>
    );
};

export default Page;