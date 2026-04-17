export type TaskProps = {
    _id: string;
    title: string;
    tag: "urgent" | "important";
    description: string;
    userId?: string;
}