"use client"
import { SidebarTrigger } from "../ui/sidebar"
import { LogoutButton } from "./LogoutButton"

const AppHeader = () => {

  return (
    <div className="border border-amber-500 h-16 flex justify-between">
      <SidebarTrigger/>
      <LogoutButton/>
    </div>
  )
}

/*
Code for the logout button

async function handleLogout() {
  await supabase.auth.signOut();
  router.push("/auth/login");
}
*/

export default AppHeader