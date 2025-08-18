import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function POST(req: Request) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  const { name, email, phone, imageUrl } = await req.json();
  if (!name || !email) {
    return new NextResponse("Missing fields", { status: 400 });
  }
  const pacient = await prisma.patient.create({
    data: {
      name,
      email,
      phone,
      imageUrl,
      therapistId: session.user.id,
    },
  });
  return NextResponse.json(pacient);
}

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  const pacients = await prisma.patient.findMany({
    where: { therapistId: session.user.id },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(pacients);
}
