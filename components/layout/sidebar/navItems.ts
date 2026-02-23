import { Home, User, Settings } from "lucide-react"
import type { mainNavTypes } from "@/lib/types/mainNavTypes"



export const mainNav:mainNavTypes = [
    {
        title: "Overview",
        href: "/dashboard",
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
]