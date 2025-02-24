import UpdateTaskClient from "@/app/tasks/update/[taskId]/update-task-client";

export default function Page() {
    return (
        <div>
            <h2>Update Task</h2>
            <UpdateTaskClient />
        </div>
    );
}