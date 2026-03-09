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
    supabase.from("invoices").select("amount"),
  ]);

  const revenue =
    invoices?.reduce((sum, invoice) => sum + Number(invoice.amount), 0) ?? 0;

  return {
    clients: clients ?? 0,
    projects: projects ?? 0,
    tasks: tasks ?? 0,
    revenue,
  };
}