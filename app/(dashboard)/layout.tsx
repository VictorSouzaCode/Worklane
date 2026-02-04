import Header from "@/components/layout/Header"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import AppSidebar from "@/components/layout/sidebar/AppSidebar"

type LayoutTypes = {
    children: React.ReactNode
}

const Layout = ({
    children,
}:LayoutTypes) => {

  return (
    <SidebarProvider>
        <div className="flex w-full min-h-screen border border-red-500">
            <AppSidebar/>
            <SidebarInset>
                <Header/>
                    <main>
                    {children}
                    </main>
            </SidebarInset>
        </div>
    </SidebarProvider>
  )
}

export default Layout