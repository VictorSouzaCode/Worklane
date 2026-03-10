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
NEXT TASKS:
Task status (todo / in_progress / done) - THIS ONE IS THE NEXT ONE, I HAVE ALREADY CREATED IT WITH CHATGPT

Add loading states + better UX

Add editing for clients/projects/tasks



THINGS I NEED TO FINISH THE PROJECT:
1 Edit clients/projects/tasks
2 Toast notifications
3 Confirmation dialogs
4 Status badges
5 Dashboard widgets (recent projects/tasks)
6 Better invoice status
7 Search




FEATURES TO ADD IN MY OTHER PROJECT AFTER I COPY THIS ONE COMPLETLY
Activity Timeline (Event Log)
• Client created
• Project created
• Task moved to "In Progress"
• Invoice sent
• Invoice paid

Smart Dashboard Insights
Top client by revenue
Projects nearing deadline
Overdue invoices
Tasks due today
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