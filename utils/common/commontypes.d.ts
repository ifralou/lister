import {UUID} from "crypto";

type LayoutProps = { children: React.ReactNode }

type Task = {
    id: number | null,
    title: string,
    steps: string[],
    build_in_lists: string[],
    user_list: string | null,
    assignee_id: UUID | null,
    repeat_timestamp: Date | null,
    due_timestamp: Date | null,
    remind_timestamp: Date | null,
}