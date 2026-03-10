"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/browser";
import { getInvoices, createInvoice, deleteInvoice } from "@/lib/api/invoices";
import { getProjects } from "@/lib/api/projects";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Invoice = {
  id: string;
  amount: number;
  status: string;
  due_date: string | null;
  projects: {
    name: string;
  };
};

type Project = {
  id: string;
  name: string;
};

export default function InvoicesPage() {
  const supabase = createClient();

  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  const [projectId, setProjectId] = useState("");
  const [amount, setAmount] = useState("");

  async function fetchInvoices() {
    const data = await getInvoices();
    setInvoices(data || []);
  }

  async function fetchProjects() {
    const data = await getProjects();
    setProjects(data || []);
  }

  useEffect(() => {
    fetchInvoices();
    fetchProjects();
  }, []);

  async function handleCreate() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user || !projectId) return;

    await createInvoice({
      userId: user.id,
      projectId,
      amount: Number(amount),
      status: "draft",
    });

    setAmount("");
    setProjectId("");

    fetchInvoices();
  }

  async function handleDelete(id: string) {
    await deleteInvoice(id);
    fetchInvoices();
  }

  return (
    <div className="flex flex-col gap-6">

      <h1 className="text-2xl font-semibold">Invoices</h1>

      <Card>
        <CardHeader>
          <CardTitle>Create Invoice</CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-4">

          <select
            className="border rounded-md p-2 text-sm"
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
          >
            <option value="">Select project</option>

            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>

          <Input
            placeholder="Amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <Button onClick={handleCreate}>
            Create Invoice
          </Button>

        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Invoices</CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-4">

          {invoices.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No invoices yet.
            </p>
          )}

          {invoices.map((invoice) => (
            <div
              key={invoice.id}
              className="flex items-center justify-between border rounded-md p-4"
            >
              <div>
                <p className="font-medium">
                  ${invoice.amount}
                </p>

                <p className="text-sm text-muted-foreground">
                  Project: {invoice.projects?.name}
                </p>
              </div>

              <Button
                variant="destructive"
                onClick={() => handleDelete(invoice.id)}
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