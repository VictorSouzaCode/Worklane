import { Home, User, Settings } from "lucide-react"
import type { mainNavTypes } from "@/lib/types/mainNavTypes"



export const mainNav:mainNavTypes = [
    {
        title: "Overview",
        href: "overview",
        icon: Home

    },
    {
        title: "Clients",
        href: "overview",
        icon:  User
    },
    {
        title: "Projects",
        href: "overview",
        icon: Settings
    },
]