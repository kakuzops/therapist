"use client";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";

export function PacientList() {
  const [pacients, setPacients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/pacients")
      .then(res => res.json())
      .then(data => setPacients(data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Card className="p-6 max-w-md mx-auto mt-6">
      <h2 className="text-xl font-bold mb-2">Pacientes cadastrados</h2>
      {loading ? (
        <div>Carregando...</div>
      ) : pacients.length === 0 ? (
        <div>Nenhum paciente cadastrado.</div>
      ) : (
        <ul className="space-y-2">
          {pacients.map(p => (
            <li key={p.id} className="border rounded p-2 flex items-center gap-4">
              {p.imageUrl ? (
                <img src={p.imageUrl} alt={p.name} className="w-12 h-12 rounded-full object-cover" />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">?</div>
              )}
              <div>
                <div className="font-semibold">{p.name}</div>
                <div className="text-sm text-muted-foreground">{p.email}</div>
                {p.phone && <div className="text-sm text-muted-foreground">{p.phone}</div>}
              </div>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
