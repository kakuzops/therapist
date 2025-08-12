import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Card } from "@/components/ui/card";
import { ButtonSignOut } from "./_components/button-signout";
import {SideBarDashboard} from "./_components/sidebar-dashboard";

export default async function Dashboard() {

    const session = await auth.api.getSession({
        headers: await headers(),
    })
    console.log(session)
    if (!session) {
        redirect("/dashboard");
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            <SideBarDashboard />
           <Card className="w-full max-w-md p-6 bg-white shadow-md rounded-lg">
                <h1 className="text-2xl font-bold text-center mb-4">
                    Welcome to the Dashboard
                </h1>
                <p className="text-gray-600 text-center mb-6">
                    You are logged in as {session.user?.email || "User"}.
                </p>
                <p className="text-gray-500 text-center">
                    This is a protected route. You can access your account settings and other features here.
                </p>
            </Card>
        </div>
    );
}