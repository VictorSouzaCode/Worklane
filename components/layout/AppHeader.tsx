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

export default AppHeader