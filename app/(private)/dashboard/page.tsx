import {createClient} from "@/utils/supabase/server";
import {cookies} from "next/headers";
import { redirectGuard } from "@/utils/common/helpers";
import Dashboard from "@/app/ui/dashboard/Dashboard";
import React from "react";
import Navigation from "@/app/ui/navigation/Navigation";

export const dynamic = "force-dynamic";

const Page = async () => {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    await redirectGuard(supabase);

    // const data = await supabase.from("tasks").select();

    return (
        <div className="flex flex-col w-full flex-grow">
            <Navigation/>
            <Dashboard/>
        </div>
    );
};

export default Page;