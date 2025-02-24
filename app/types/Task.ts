export interface Task {
    id: number;
    title: string;
    description: string;
    status: string;
    priority: string;
    due_date: string;
    assigned_to?: number;
    assignee?: number;
    created_at: string;
    updated_at: string;
}