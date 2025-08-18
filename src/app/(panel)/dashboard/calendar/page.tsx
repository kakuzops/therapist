import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { format, isSameDay } from "date-fns";
import { ClientDateWrapper } from "./_components/client-date-wrapper";
import { AppointmentsPanel, Appointment } from "./_components/appointments-panel";
import { NewAppointmentButton } from "./_components/new-appointment-button";

export default async function Calendar() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect("/");
  }

  // Fetch patients
  const patients = await prisma.patient.findMany({
    where: { therapistId: session.user.id },
    select: { id: true, name: true, email: true, imageUrl: true },
  });

  // Fetch appointments
  const appointments = await prisma.appointment.findMany({
    where: { therapistId: session.user.id },
    include: { patient: true },
  });

  // For demo: status alternates, type is random
  const today = new Date();
  const todaysAppointments: Appointment[] = appointments
    .filter(app => isSameDay(new Date(app.startTime), today))
    .map((app, i) => ({
      id: app.id,
      patient: { name: app.patient.name, imageUrl: app.patient.imageUrl ?? undefined },
      type: i % 2 === 0 ? "Therapy Session" : "Initial Consultation",
      time: format(new Date(app.startTime), "HH:mm"),
      status: i % 3 === 0 ? "pending" : "confirmed",
    }));



  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Calendar</h1>
        <NewAppointmentButton  />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <ClientDateWrapper initialDate={today} />
        </div>
        <div>
          <AppointmentsPanel appointments={todaysAppointments} />
        </div>
      </div>
    </div>
  );
}