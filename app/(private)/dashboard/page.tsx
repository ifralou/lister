import {createClient} from "@/utils/supabase/server";
import {cookies} from "next/headers";
import { redirectGuard } from "@/utils/common/withAuth";
import Dashboard from "@/app/(private)/dashboard/dashboard";

export const dynamic = "force-dynamic";

const Page = async () => {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    await redirectGuard(supabase);

    // const data = await supabase.from("tasks").select();

    return (
        <div className="flex w-full h-screen">
            <Dashboard/>
            {/*<AuthButton/>*/}
            {/*<pre className={"p-6"}>*/}
            {/*    {JSON.stringify(data)}*/}
            {/*</pre>*/}

        </div>
    );
};

export default Page;