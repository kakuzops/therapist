import { auth } from "@/lib/auth"
import { headers } from "next/headers"

const AuthenticatedAction = async () => {
    "use server";
    const session = await auth.api.getSession({
        headers: await headers()
    })
};