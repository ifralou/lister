import {createClient} from "@/utils/supabase/client";

export async function getTasks() {
    const supabaseClient = createClient();

    const {error, data} = await supabaseClient.from("tasks").select();

    if(error) {
        throw new Error("DB error occured.");
    }

    return data || [];
}

type Task = {
    title: string
}
export async function addTask({title} : Task) {
    const supabaseClient = createClient();
    const {data: {user}}= await supabaseClient.auth.getUser();
    console.log(user);

    const response = await supabaseClient.from("tasks")
        .insert({title, user_id: user?.id});
    console.log("addTask", response);
}