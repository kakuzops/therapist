import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { SideBarDashboard } from "../_components/sidebar-dashboard";
import { Card } from "@/components/ui/card";

export default async function Calendar() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    console.log(session);
    if (!session) {
        redirect("/dashboard");
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            <h1>vasco</h1>
        </div>
    );
}