import SidebarNav from "./SidebarNav"
import { mainNav } from "./navItems"
import { Sidebar,SidebarContent, SidebarHeader } from "@/components/ui/sidebar"

const AppSidebar = () => {
  return (
    <Sidebar collapsible="icon">
        <SidebarHeader>
            <h1 className="font-bold group-data-[collapsible=icon]:hidden">Worklane</h1>
        </SidebarHeader>
            <SidebarContent>
                <SidebarNav items={mainNav}/>
            </SidebarContent>
        
    </Sidebar>
  )
}

export default AppSidebar