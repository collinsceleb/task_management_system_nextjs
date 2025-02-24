import DeleteTaskClient from "@/app/tasks/delete/[taskId]/delete-task-client";

export default function Page() {
    return (
        <div>
            <h2>Update Task</h2>
            <DeleteTaskClient />
        </div>
    );
}