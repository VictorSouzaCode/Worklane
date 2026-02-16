import { createBrowserClient} from "@supabase/ssr";

export function createClient() {
    return createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
    );
}

// the first one This is the address of your Supabase backend

// the second one is your public access key. It tells Supabase This request belongs to this project.”