import { Button } from "../ui/button";
import { createClient } from "@/lib/supabase/browser";
import { useRouter } from "next/navigation";

export const LogoutButton = () => {
  const supabase = createClient();
  const router = useRouter();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
  }
  return (
    <Button 
    size="sm"
    variant="outline"
    className="cursor-pointer"
    onClick={handleLogout}
    >Logout</Button>
  );
};
