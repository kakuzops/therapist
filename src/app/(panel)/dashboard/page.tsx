import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Users, DollarSign, TrendingUp } from "lucide-react";
import { StatsCard } from "./_components/stats-card";
import { ClientsList } from "./_components/clients-list";
import { CalendarCard } from "./_components/calendar-card";

export default async function Dashboard() {
    const session = await auth.api.getSession({
        headers: await headers(),
    })

    if (!session) {
        redirect("/");
    }

    // Aqui você pode buscar os dados reais do seu backend
    const mockClients = [
        { id: '1', name: 'João Silva', email: 'joao@email.com', nextSession: new Date(2025, 7, 20) },
        { id: '2', name: 'Maria Santos', email: 'maria@email.com', nextSession: new Date(2025, 7, 21) },
        { id: '3', name: 'Pedro Oliveira', email: 'pedro@email.com', nextSession: new Date(2025, 7, 22) },
    ];

    return (
        <div>
            <div className="grid gap-4 md:grid-cols-3 mb-8">
                <StatsCard
                    title="Total de Clientes"
                    value="45"
                    icon={<Users className="h-4 w-4 text-gray-500" />}
                />
                <StatsCard
                    title="Faturamento do Mês"
                    value="R$ 12.450"
                    icon={<DollarSign className="h-4 w-4 text-gray-500" />}
                />
                <StatsCard
                    title="Crescimento"
                    value="12%"
                    icon={<TrendingUp className="h-4 w-4 text-gray-500" />}
                />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
                <ClientsList clients={mockClients} />
                <CalendarCard />
            </div>

        </div>
    );
}