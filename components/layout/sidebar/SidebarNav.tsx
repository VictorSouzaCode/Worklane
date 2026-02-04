import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import Link from "next/link"
import type { mainNavTypes } from "@/lib/types/mainNavTypes"

type SidebarNavProps = {
    items: mainNavTypes
}

const SidebarNav = ({
    items,
}:SidebarNavProps) => {

  return (
    <SidebarGroup>
        <SidebarGroupContent>
            <SidebarMenu>
                {items.map((item) => (
                    <SidebarMenuItem key={item.title}>

                        <SidebarMenuButton>
                            <Link href={item.href}>
                            <span>{item.title}</span>
                            </Link>
                        </SidebarMenuButton>

                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroupContent>
    </SidebarGroup>
  )
}

export default SidebarNav