"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/browser";
import { getTasks, createTask, deleteTask } from "@/lib/api/tasks";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Task = {
  id: string;
  title: string;
};

export default function ProjectDetailPage() {
  const { id } = useParams();
  const supabase = createClient();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");

  async function fetchTasks() {
    const data = await getTasks(id as string);
    setTasks(data || []);
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  async function handleCreate() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    await createTask({
      userId: user.id,
      projectId: id as string,
      title,
    });

    setTitle("");
    fetchTasks();
  }

  async function handleDelete(taskId: string) {
    await deleteTask(taskId);
    fetchTasks();
  }

  return (
    <div className="flex flex-col gap-6">

      <h1 className="text-2xl font-semibold">
        Project Tasks
      </h1>

      <Card>
        <CardHeader>
          <CardTitle>Add Task</CardTitle>
        </CardHeader>

        <CardContent className="flex gap-4">
          <Input
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <Button onClick={handleCreate}>
            Create
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tasks</CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-3">

          {tasks.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No tasks yet.
            </p>
          )}

          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex justify-between items-center border rounded-md p-3"
            >
              <p>{task.title}</p>

              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(task.id)}
              >
                Delete
              </Button>
            </div>
          ))}

        </CardContent>
      </Card>

    </div>
  );
}