"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/browser";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getProject } from "@/lib/api/projects"
import {
  getTasks,
  createTask,
  deleteTask,
  updateTaskStatus,
} from "@/lib/api/tasks";


type Project = {
  id: string
  name: string
  budget: number | null
  deadline: string | null
  clients: {
    name: string
  }
}

type Task = {
  id: string;
  title: string;
  status: "todo" | "in_progress" | "done";
};

export default function ProjectDetailPage() {
  const { id } = useParams();
  const supabase = createClient();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");

  const [project, setProject] = useState<Project | null>(null)

  async function fetchTasks() {
    const data = await getTasks(id as string);
    setTasks(data || []);
  }

  async function fetchProject() {
  const data = await getProject(id as string)
  setProject(data)
}

  useEffect(() => {
    fetchProject();
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

  const todoTasks = tasks.filter((t) => t.status === "todo");
const inProgressTasks = tasks.filter((t) => t.status === "in_progress");
const doneTasks = tasks.filter((t) => t.status === "done");

  return (
    <div className="flex flex-col gap-6">

      {project && (
  <Card>
    <CardHeader>
      <CardTitle>{project.name}</CardTitle>
    </CardHeader>

    <CardContent className="flex gap-8 text-sm text-muted-foreground">
      <div>
        <p className="font-medium text-foreground">Client</p>
        <p>{project.clients?.name}</p>
      </div>

      <div>
        <p className="font-medium text-foreground">Budget</p>
        <p>${project.budget ?? "—"}</p>
      </div>

      <div>
        <p className="font-medium text-foreground">Deadline</p>
        <p>{project.deadline ?? "—"}</p>
      </div>
    </CardContent>
  </Card>
)}

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

      <div className="grid grid-cols-3 gap-6">

  {/* TODO COLUMN */}
  <Card>
    <CardHeader>
      <CardTitle>Todo</CardTitle>
    </CardHeader>

    <CardContent className="flex flex-col gap-3">
      {todoTasks.map((task) => (
        <div
          key={task.id}
          className="border rounded-md p-3 flex justify-between items-center"
        >
          <p>{task.title}</p>

          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={async () => {
                await updateTaskStatus(task.id, "in_progress");
                fetchTasks();
              }}
            >
              Start
            </Button>

            <Button
              size="sm"
              variant="destructive"
              onClick={() => handleDelete(task.id)}
            >
              Delete
            </Button>
          </div>
        </div>
      ))}
    </CardContent>
  </Card>

  {/* IN PROGRESS COLUMN */}
  <Card>
    <CardHeader>
      <CardTitle>In Progress</CardTitle>
    </CardHeader>

    <CardContent className="flex flex-col gap-3">
      {inProgressTasks.map((task) => (
        <div
          key={task.id}
          className="border rounded-md p-3 flex justify-between items-center"
        >
          <p>{task.title}</p>

          <Button
            size="sm"
            onClick={async () => {
              await updateTaskStatus(task.id, "done");
              fetchTasks();
            }}
          >
            Done
          </Button>
        </div>
      ))}
    </CardContent>
  </Card>

  {/* DONE COLUMN */}
  <Card>
    <CardHeader>
      <CardTitle>Done</CardTitle>
    </CardHeader>

    <CardContent className="flex flex-col gap-3">
      {doneTasks.map((task) => (
        <div
          key={task.id}
          className="border rounded-md p-3 flex justify-between items-center"
        >
          <p>{task.title}</p>

          <Button
            size="sm"
            variant="outline"
            onClick={async () => {
              await updateTaskStatus(task.id, "todo");
              fetchTasks();
            }}
          >
            Reopen
          </Button>
        </div>
      ))}
    </CardContent>
  </Card>

</div>

    </div>
  );
}