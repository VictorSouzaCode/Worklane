"use client";

import { useEffect, useState } from "react";
import { getClients, createClientEntry, deleteClient } from "@/lib/api/clients";
import { createClient } from "@/lib/supabase/browser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/*
In a more advanced version of Ledgerly, we would:

Use Server Components to fetch data

Or use React Query / TanStack Query

Or move to Server Actions

But for now?

Your current approach is fine.
We just polish it slightly.
*/

type Client = {
  id: string;
  name: string;
  email: string | null;
  company: string | null;
};

export default function ClientsPage() {
  const supabase = createClient();

  const [clients, setClients] = useState<Client[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");

  async function fetchClients() {
    const data = await getClients();
    setClients(data || []);
  }

  useEffect(() => {
    let isMounted = true;

    async function load() {
      const data = await getClients();
      if (isMounted) {
        setClients(data || []);
      }
    }

    load();

    return () => {
      isMounted = false;
    };
  }, []);

  async function handleCreate() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    await createClientEntry({
      userId: user.id,
      name,
      email,
      company,
    });

    setName("");
    setEmail("");
    setCompany("");

    fetchClients();
  }

  async function handleDelete(id: string) {
    await deleteClient(id);
    fetchClients();
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold">Clients</h1>

      <Card>
        <CardHeader>
          <CardTitle>Add Client</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Input
            placeholder="Client name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />

          <Button onClick={handleCreate}>Create Client</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Clients</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {clients.length === 0 && (
            <p className="text-sm text-muted-foreground">No clients yet.</p>
          )}

          {clients.map((client) => (
            <div
              key={client.id}
              className="flex items-center justify-between border rounded-md p-4"
            >
              <div>
                <p className="font-medium">{client.name}</p>
                <p className="text-sm text-muted-foreground">
                  {client.company}
                </p>
              </div>

              <Button
                variant="destructive"
                onClick={() => handleDelete(client.id)}
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
