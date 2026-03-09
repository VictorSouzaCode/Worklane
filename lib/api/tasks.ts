import { createClient } from "@/lib/supabase/browser";

export async function getTasks(projectId: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("project_id", projectId)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
}

export async function createTask({
  userId,
  projectId,
  title,
}: {
  userId: string;
  projectId: string;
  title: string;
}) {
  const supabase = createClient();

  const { error } = await supabase.from("tasks").insert({
    user_id: userId,
    project_id: projectId,
    title,
  });

  if (error) throw error;
}

export async function deleteTask(id: string) {
  const supabase = createClient();

  const { error } = await supabase
    .from("tasks")
    .delete()
    .eq("id", id);

  if (error) throw error;
}