import { createClient } from "@/lib/supabase/browser";

export async function getProjects() {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("projects")
    .select("*, clients(name)")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
}

export async function createProjectEntry({
  userId,
  clientId,
  name,
  status,
  deadline,
  budget,
}: {
  userId: string;
  clientId: string;
  name: string;
  status?: string;
  deadline?: string;
  budget?: number;
}) {
  const supabase = createClient();

  const { error } = await supabase.from("projects").insert({
    user_id: userId,
    client_id: clientId,
    name,
    status,
    deadline,
    budget,
  });

  if (error) throw error;
}

export async function deleteProject(id: string) {
  const supabase = createClient();

  const { error } = await supabase
    .from("projects")
    .delete()
    .eq("id", id);

  if (error) throw error;
}