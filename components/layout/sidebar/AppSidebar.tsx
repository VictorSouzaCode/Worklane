import SidebarNav from "./SidebarNav"
import { mainNav } from "./navItems"
import { Sidebar,SidebarContent, SidebarHeader } from "@/components/ui/sidebar"
import { Anchor } from "lucide-react"

const AppSidebar = () => {
  return (
    <Sidebar collapsible="icon">
        <SidebarHeader className="flex border-b flex-row h-16 items-center">
          <Anchor className="shrink-0"/>
            <h1 className="font-bold group-data-[collapsible=icon]:hidden">Worklane</h1>
        </SidebarHeader>
            <SidebarContent>
                <SidebarNav items={mainNav}/>
            </SidebarContent>
        
    </Sidebar>
  )
}

export default AppSidebar