import React from 'react';
import {cookies} from "next/headers";
import {createClient} from "@/utils/supabase/server";
import {redirectGuard} from "@/utils/common/helpers";
import Navigation from "@/app/ui/navigation/Navigation";
const Layout = async ({children} : LayoutProps) => {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    await redirectGuard(supabase);
    // const data = await supabase.from("tasks").select();

    return (
        <div className="flex flex-col w-full flex-grow">
            <Navigation/>
            {children}
        </div>
    );
};

export default Layout;