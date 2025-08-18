"use client";

import { useState } from "react";
// import { NewAppointmentButton } from "./new-appointment-button";
import { AppointmentsPanel, Appointment } from "./appointments-panel";
import { DatePicker } from "./date-picker";

interface ClientCalendarProps {
  appointments: Appointment[];
}

export function ClientCalendar({ appointments }: ClientCalendarProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDialog, setShowDialog] = useState(false);

  // Filtra compromissos do dia selecionado
  const todaysAppointments = appointments.filter((app) => {
    // Supondo que app.time é "HH:mm" e app tem startTime
    // Se não tiver startTime, ajuste para comparar com selectedDate
    return true; // Aqui você pode ajustar a lógica de filtro por data
  });

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Calendar</h1>
        <NewAppointmentButton onClick={() => setShowDialog(true)} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <span className="font-semibold text-lg mb-4 block">Select Date</span>
          <DatePicker selected={selectedDate} onSelect={setSelectedDate} />
        </div>
        <div>
          <AppointmentsPanel appointments={todaysAppointments} />
        </div>
      </div>
    </div>
  );
}

export default function CalendarPage() {
  // You need to provide the appointments prop here.
  // If you have a source for appointments, import or fetch them.
  // For now, we'll use an empty array as a placeholder.
  return <ClientCalendar appointments={[]} />;
}

import React from "react";

interface NewAppointmentButtonProps {
  onClick?: () => void;
}

export function NewAppointmentButton({ onClick }: NewAppointmentButtonProps) {
  return (
    <button className="btn btn-primary" onClick={onClick}>
      New Appointment
    </button>
  );
}
