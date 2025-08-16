'use client'
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
import { usePathname } from 'next/navigation';
import { authClient } from "@/lib/auth-client";


import { useEffect, useState } from "react";
import Link from "next/link";
import clsx from "clsx";

const items = [
    {
        title: "Home",
        url: "/dashboard",
        icon: Home,
    },
    {
        title: "Inbox",
        url: "/dashboard/inbox",
        icon: Inbox,
    },
    {
        title: "Calendar",
        url: "/dashboard/calendar",
        icon: Calendar,
    },
    {
        title: "Search",
        url: "/dashboard/search",
        icon: Search,
    },
    {
        title: "Settings",
        url: "/dashboard/settings",
        icon: Settings,
    },
];

const NavLinks = () => {
    const pathname = usePathname();
    return (
        <div className="flex flex-col space-y-2">
            {items.map((item) => (
                <SidebarLink
                    key={item.url}
                    href={item.url}
                    icon={<item.icon className="w-5 h-5" />}
                    label={item.title}
                    pathname={pathname}
                    />
            ))}
        </div>
    );
};

interface SidebarDashboardLinkProps {
    href: string;
    icon: React.ReactNode;
    label: string;
    pathname: string;
    isCollapsed?: boolean;
}

function SidebarLink({ href, icon, label, pathname, isCollapsed }: SidebarDashboardLinkProps) {
    console.log("LABEL", label);
    return (
        <Link href={href}>
            <div className={clsx("flex items-center gap-2 px-3 py-2 rounded-md transition-colors", {
                "text-white bg-neutral-600": pathname === href,
                "text-gray-700 hover:bg-blue-300 hover:text-white": pathname !== href,
            })}>
                <span className="w-6 h-6">{icon}</span>
                {!isCollapsed && <span>{label}</span>}
            </div>
        </Link>
    )
}

export function SideBarDashboard({ children }: { children?: React.ReactNode }) {
    const [sessionUser, setSessionUser] = useState<any>(null);
    useEffect(() => {
        authClient.getSession().then(session => {
            setSessionUser(session?.data?.user ?? null);
        });
    }, []);

    return (
        <SidebarProvider>
            <Sidebar>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                <NavLinks />
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
                <NavUser
                    user={
                        sessionUser
                            ? {
                                name: sessionUser.name ?? undefined,
                                email: sessionUser.email ?? undefined,
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
    );
}