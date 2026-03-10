import { createClient } from "@/lib/supabase/browser";

export async function getInvoices() {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("invoices")
    .select("*, projects(name)")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
}

export async function createInvoice({
  userId,
  projectId,
  amount,
  status,
  dueDate,
}: {
  userId: string;
  projectId: string;
  amount: number;
  status?: string;
  dueDate?: string;
}) {
  const supabase = createClient();

  const { error } = await supabase.from("invoices").insert({
    user_id: userId,
    project_id: projectId,
    amount,
    status,
    due_date: dueDate,
  });

  if (error) throw error;
}

export async function deleteInvoice(id: string) {
  const supabase = createClient();

  const { error } = await supabase
    .from("invoices")
    .delete()
    .eq("id", id);

  if (error) throw error;
}