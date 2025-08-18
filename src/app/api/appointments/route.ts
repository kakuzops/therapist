import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { patientId, start, end, notes } = body;

    const appointment = await prisma.appointment.create({
      data: {
        startTime: new Date(start),
        endTime: new Date(end),
        notes,
        patient: {
          connect: { id: patientId }
        },
        therapist: {
          connect: { id: session.user.id }
        }
      },
      include: {
        patient: true,
      },
    });

    return NextResponse.json(appointment);
  } catch (error) {
    console.error("[APPOINTMENTS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
