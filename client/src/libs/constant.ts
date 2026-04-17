import type { TaskProps } from "./types";

export const tasks: TaskProps[] = [
    {
        _id: "1",
        tag: "urgent",
        title: "Fintech website update",
        description: "This is a sample description"
    },
    {
        _id: "2",
        tag: "important",
        title: "Taskduty update",
        description: "This is a sample description"
    },
    {
        _id: "3",
        tag: "urgent",
        title: "Online class update",
        description: "This is a sample description"
    },
] as const