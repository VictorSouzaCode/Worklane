"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/browser";
import { getProjects, createProjectEntry, deleteProject } from "@/lib/api/projects";
import { getClients } from "@/lib/api/clients";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

type Client = {
  id: string;
  name: string;
};

type Project = {
  id: string;
  name: string;
  status: string;
  deadline: string | null;
  budget: number | null;
  clients: {
    name: string;
  };
};

export default function ProjectsPage() {
  const supabase = createClient();

  const [projects, setProjects] = useState<Project[]>([]);
  const [clients, setClients] = useState<Client[]>([]);

  const [name, setName] = useState("");
  const [clientId, setClientId] = useState("");
  const [budget, setBudget] = useState("");

  async function fetchProjects() {
    const data = await getProjects();
    setProjects(data || []);
  }

  async function fetchClientsList() {
    const data = await getClients();
    setClients(data || []);
  }

  useEffect(() => {
    fetchProjects();
    fetchClientsList();
  }, []);

  async function handleCreate() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user || !clientId) return;

    await createProjectEntry({
      userId: user.id,
      clientId,
      name,
      budget: Number(budget),
    });

    setName("");
    setBudget("");
    setClientId("");

    fetchProjects();
  }

  async function handleDelete(id: string) {
    await deleteProject(id);
    fetchProjects();
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold">Projects</h1>

      <Card>
        <CardHeader>
          <CardTitle>Create Project</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Input
            placeholder="Project name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <select
            className="border rounded-md p-2 text-sm"
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
          >
            <option value="">Select client</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.name}
              </option>
            ))}
          </select>

          <Input
            placeholder="Budget"
            type="number"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          />

          <Button onClick={handleCreate}>Create Project</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Projects</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {projects.length === 0 && (
            <p className="text-sm text-muted-foreground">No projects yet.</p>
          )}

          {projects.map((project) => (
            <div
              key={project.id}
              className="flex items-center justify-between border rounded-md p-4"
            >
              <div>
                <p className="font-medium">{project.name}</p>
                <p className="text-sm text-muted-foreground">
                  Client: {project.clients?.name}
                </p>
              </div>

              <Link href={`/projects/${project.id}`}>
                <p className="font-medium hover:underline cursor-pointer">
                  {project.name}
                </p>
              </Link>

              <Button
                variant="destructive"
                onClick={() => handleDelete(project.id)}
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

/*
By the end:

I can create a project

I must select a client

I can list projects

Projects belong to the logged-in user

Projects are relationally connected to clients

Delete works

RLS still protects everything

Same pattern as Clients — just one level deeper.
*/