import CompleteTaskClient from "@/app/tasks/complete/[taskId]/complete-task-client";

export default function Page() {
    return (
        <div>
            <h2>Update Task</h2>
            <CompleteTaskClient />
        </div>
    );
}