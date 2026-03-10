"use client";

import { useEffect, useState } from "react";
import { getDashboardStats } from "@/lib/api/dashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RevenueChart } from "@/components/dashboard/RevenueChart";

type Stats = {
  clients: number;
  projects: number;
  tasks: number;
  revenue: number;
  revenueChart: {
    month: string;
    revenue: number;
  }[];
};

export default function OverviewPage() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    async function load() {
      const data = await getDashboardStats();
      setStats(data);
    }

    load();
  }, []);

  if (!stats) return <p>Loading dashboard...</p>;

  return (
    <div className="flex flex-col gap-6">

      <h1 className="text-2xl font-semibold">Overview</h1>

      <div className="grid grid-cols-4 gap-6">

        <Card>
          <CardHeader>
            <CardTitle>Clients</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.clients}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.projects}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.tasks}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">${stats.revenue}</p>
          </CardContent>
        </Card>

      </div>

      <Card>
        <CardHeader>
          <CardTitle>Revenue Over Time</CardTitle>
        </CardHeader>

        <CardContent>
          <RevenueChart data={stats.revenueChart} />
        </CardContent>
      </Card>

    </div>
  );
}

/*
Things to add in the dashboard in sequence. open the editor go to ai say what i want copy and past the code

Invoices (Money & Legitimacy)
Goal

Task status (todo / in_progress / done)

Project header (client, budget, deadline)

Revenue chart

Add loading states + better UX

Add editing for clients/projects/tasks
*/

/*
Why This Is Good Architecture

The page doesn't talk directly to Supabase.

UI → dashboard.ts → Supabase

That separation means:

easier refactoring

cleaner pages

reusable logic

This is exactly the pattern used in real SaaS apps.
*/