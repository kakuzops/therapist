"use client";
import { useState } from "react";

export function NewAppointmentButton() {
  const [loading, setLoading] = useState(false);

  async function handleCreate() {
    setLoading(true);
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patientId: "ID_DO_PACIENTE",
          start: new Date(),
          end: new Date(new Date().getTime() + 60 * 60 * 1000),
          notes: "Novo agendamento criado pelo botão."
        })
      });
      if (!res.ok) throw new Error("Erro ao criar agendamento");
    } catch (err) {
      alert("Erro ao criar agendamento");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleCreate}
      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow flex items-center gap-2"
      disabled={loading}
    >
      <span className="text-xl">+</span> {loading ? "Criando..." : "New Appointment"}
    </button>
  );
}
