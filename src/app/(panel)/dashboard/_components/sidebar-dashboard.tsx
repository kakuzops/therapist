import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarFooter,
} from "@/components/ui/sidebar"

import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"
import { NavUser } from "./nav-user"
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

const session = await auth.api.getSession({
        headers: await headers(),
})

const sessionUser = session?.user

const items = [
    {
        title: "Home",
        url: "#",
        icon: Home,
    },
    {
        title: "Inbox",
        url: "#",
        icon: Inbox,
    },
    {
        title: "Calendar",
        url: "#",
        icon: Calendar,
    },
    {
        title: "Search",
        url: "#",
        icon: Search,
    },
    {
        title: "Settings",
        url: "#",
        icon: Settings,
    },
]

export function SideBarDashboard() {
    return (
        <SidebarProvider>
            <Sidebar>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel>Application</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild>
                                            <a href={item.url}>
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
                <NavUser
                    user={
                        sessionUser
                            ? {
                                name: sessionUser.name,
                                email: sessionUser.email,
                                image: sessionUser.image ?? undefined,
                                avatar: undefined,
                            }
                            : { name: undefined, email: undefined, image: undefined, avatar: undefined }
                    }
                />
            </Sidebar>
            <SidebarFooter>
               
            </SidebarFooter>
        </SidebarProvider>
    )
}