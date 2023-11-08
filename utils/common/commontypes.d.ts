import {UUID} from "crypto";

type LayoutProps = { children: React.ReactNode }

type Task = {
    id: number,
    title: string,
    steps: string[],
    build_in_lists: string[],
    user_list: string,
    assignee_id: UUID,
    repeat_timestamp: Date,
    due_timestamp: Date,
    remind_timestamp: Date,
}