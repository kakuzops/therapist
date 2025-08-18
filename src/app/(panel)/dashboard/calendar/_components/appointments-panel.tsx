import { format } from "date-fns";

export interface Appointment {
  id: string;
  patient: {
    name: string;
    imageUrl?: string;
  };
  type: string;
  time: string;
  status: "confirmed" | "pending";
}

export function AppointmentsPanel({ appointments }: { appointments: Appointment[] }) {
  return (
    <div className="bg-white rounded-lg shadow p-6 w-full">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-blue-600"><svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" d="M12 6v6l4 2"/></svg></span>
        <span className="font-semibold text-lg">Today's Appointments</span>
      </div>
      <div className="space-y-4">
        {appointments.length === 0 ? (
          <div className="text-gray-500">No appointments for today.</div>
        ) : appointments.map(app => (
          <div key={app.id} className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 rounded-full p-2">
                <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" stroke="#3b82f6" strokeWidth="2"/><path stroke="#3b82f6" strokeWidth="2" d="M4 20c0-2.21 3.58-4 8-4s8 1.79 8 4"/></svg>
              </div>
              <div>
                <div className="font-semibold">{app.patient.name}</div>
                <div className="text-sm text-gray-500">{app.type}</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-mono text-gray-700 text-sm">{app.time}</span>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${app.status === "confirmed" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                {app.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
