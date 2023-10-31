import {createClient} from "@/utils/supabase/server";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {ReactNode} from "react";
import {SupabaseClient} from "@supabase/supabase-js";

/**
 * Redirect to main page if there is no user.
 * @param supabase
 */
export async function redirectGuard(supabase: SupabaseClient) {

    const userResponse = await supabase.auth.getUser();

    if(userResponse.error) {
        redirect("/?error=auth")
    }

    if(!userResponse?.data?.user) {
        redirect("/")
    }
}