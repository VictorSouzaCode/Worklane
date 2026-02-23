import { Home, User, Settings } from "lucide-react"
import type { mainNavTypes } from "@/lib/types/mainNavTypes"



export const mainNav:mainNavTypes = [
    {
        title: "Home",
        href: "/",
        icon: Home

    },
    {
        title: "Clients",
        href: "/clients",
        icon:  User
    },
    {
        title: "Projects",
        href: "/projects",
        icon: Settings
    },
    {
        title: "Invoices",
        href: "/invoices",
        icon: Settings
    }
]