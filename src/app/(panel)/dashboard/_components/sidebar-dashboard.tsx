'use client'

import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetClose,
    SheetTitle,
    SheetDescription,
    SheetHeader,
    SheetFooter,
} from "@/components/ui/sheet"

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"

import { NavUser } from "./nav-user"
import { usePathname } from 'next/navigation';
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import clsx from "clsx";
import { Banknote, CalendarCheck2, ChevronLeft, ChevronRight, Folder, FolderArchive, Icon, List, Settings, Calendar, Home, Inbox, Search, Sidebar, PersonStanding } from 'lucide-react';
import { SidebarProvider } from "@/components/ui/sidebar";

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
        title: "Pacientes",
        url: "/dashboard/pacient",
        icon: PersonStanding,
    },
    {
        title: "Settings",
        url: "/dashboard/settings",
        icon: Settings,
    },
];

const NavLinks = ({ isCollapsed }: { isCollapsed?: boolean }) => {
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
                    isCollapsed={isCollapsed}
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

export function SideBarDashboard({ children }:
    { children: React.ReactNode }) {
    const [sessionUser, setSessionUser] = useState<any>(null);
    const [isCollapsed, setIsCollapsed] = useState(false);

    useEffect(() => {
        authClient.getSession().then(session => {
            setSessionUser(session?.data?.user ?? null);
        });
    }, []);

    return (
        <div className='flex min-h-screen w-full'>
            <aside
                className={clsx("flex flex-col border-r bg-background transition-all duration-300 p-4 h-full", {
                    "w-20": isCollapsed,
                    "w-64": !isCollapsed,
                    "hidden md:flex md:fixed": true,
                })}>

                {/* <div className='mb-6 mt-4'>
                    {!isCollapsed && (
                        <Image
                            src={logoOdonto}
                            alt="Logo OdontoPro"
                            priority
                            quality={100}
                            style={{
                                width: 'auto',
                                height: 'auto'
                            }}
                        />
                    )}
                </div> */}
                <Button className='bg-gray-100 hover:bg-gray-50 text-zinc-900 self-end mb-2'
                    onClick={() => setIsCollapsed(!isCollapsed)}
                >
                    {!isCollapsed ? (
                        <ChevronLeft className="h-12 w-12" />
                    ) : <ChevronRight className="h-12 w-12" />}
                </Button>

                {isCollapsed && (
                   <div>
                        <nav className='flex flex-col gap-1 overflow-hidden mt-2'>
                            <NavLinks isCollapsed={isCollapsed} />
                        </nav>
                            <SidebarProvider >
                                <NavUser className="mb-6 mt-4"
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

                            </SidebarProvider>
                   </div>
                    
                )}

                <Collapsible open={!isCollapsed}>
                    <CollapsibleContent>
                        <nav className='flex flex-col gap-1 overflow-hidden'>
                            <span className='text-sm text-gray-400 font-medium mt-1 uppercase'>
                                Painel
                            </span>
                            <NavLinks isCollapsed={isCollapsed} />
                        </nav>
                        <SidebarProvider >
                            <NavUser className="mb-6 mt-4"
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

                        </SidebarProvider>
                    </CollapsibleContent>
                    
                </Collapsible>
            </aside>

            <div className={clsx("flex flex-1 flex-col transition-all duration-300", {
                "md:ml-20": isCollapsed,
                "md:ml-64": !isCollapsed,
            })}>
                <header className='md:hidden flex items-center justify-between p-4 border-b px-2 md:px-6 h-14 z-10 sticky top-0 bg-white'>
                    <Sheet>
                        <div className='flex items-center gap-4'>
                            <SheetTrigger asChild>
                                <Button variant="outline" onClick={() => setIsCollapsed(false)} size="icon" className='md:hidden'>
                                    <List className="h-6 w-6" />
                                </Button>
                            </SheetTrigger>

                            <h1 className='text-base md:text-lg font-semibold'>OdontoPro</h1>
                        </div>
                        <SheetContent side='left' className='sm:max-w-xs text-black'>
                            <SheetTitle>Menu Administrativo</SheetTitle>
                            <SheetDescription>
                                Menu Adm
                            </SheetDescription>
                            <nav className='grid gap-2 text-base pt-5'>
                                <NavLinks isCollapsed={false} />
                            </nav>
                        </SheetContent>
                    </Sheet>
                </header>


                <main className='flex-1 py-4 px-2 md:p-6'>
                    {children}
                </main>
                

                
            </div>
        </div>
    );
}