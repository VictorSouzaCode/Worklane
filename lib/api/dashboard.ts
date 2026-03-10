import { createClient } from "@/lib/supabase/browser";

export async function getDashboardStats() {
  const supabase = createClient();

  const [
    { count: clients },
    { count: projects },
    { count: tasks },
    { data: invoices },
  ] = await Promise.all([
    supabase.from("clients").select("*", { count: "exact", head: true }),
    supabase.from("projects").select("*", { count: "exact", head: true }),
    supabase.from("tasks").select("*", { count: "exact", head: true }),
    supabase.from("invoices").select("amount, created_at"),
  ]);

  const revenue =
    invoices?.reduce((sum, invoice) => sum + Number(invoice.amount), 0) ?? 0;

  // group revenue by month
  const revenueByMonth: Record<string, number> = {};

  invoices?.forEach((invoice) => {
    const date = new Date(invoice.created_at);
    const month = date.toLocaleString("default", { month: "short" });

    revenueByMonth[month] =
      (revenueByMonth[month] || 0) + Number(invoice.amount);
  });

  const chartData = Object.entries(revenueByMonth).map(([month, amount]) => ({
    month,
    revenue: amount,
  }));

  return {
    clients: clients ?? 0,
    projects: projects ?? 0,
    tasks: tasks ?? 0,
    revenue,
    revenueChart: chartData,
  };
}