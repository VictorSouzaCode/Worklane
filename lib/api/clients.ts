import { createClient } from "@/lib/supabase/browser"

export async function getClients() {
    const supabase = createClient();

    const { data, error } = await supabase
    .from("clients")
    .select("*")
    .order("created_at", { ascending: false});

    if (error) throw error;

    return data;
}

type ClientEntryType = {
    userId: string,
    name: string,
    email?: string,
    company?: string,
}

export async function createClientEntry({
    userId,
    name,
    email,
    company,
}: ClientEntryType) {
    const supabase = createClient();

    const { error } = await supabase.from("clients").insert({
        user_id: userId,
        name,
        email,
        company
    });

    if (error) throw error;
}

export async function deleteClient(id: string) {
    const supabase = createClient();

    const { error } = await supabase
    .from("client")
    .delete()
    .eq("id", id)

    if(error) throw error;
}

/*
    userId,
    name,
    email,
    company,
*/