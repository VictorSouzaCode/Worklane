import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import AppSidebar from "@/components/layout/sidebar/AppSidebar"
import AppHeader from "@/components/layout/AppHeader"

type LayoutTypes = {
    children: React.ReactNode
}

const Layout = ({
    children,
}:LayoutTypes) => {

  return (
    <SidebarProvider>
        <div className="flex w-full min-h-screen">
            <AppSidebar/>
            <SidebarInset className="flex flex-1 flex-col">
                <AppHeader/>
                    <main className="flex-1 overflow-y-auto p-8">
                    {children}
                    </main>
            </SidebarInset>
        </div>
    </SidebarProvider>
  )
}

export default Layout