'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ClientsListProps {
    clients: Array<{
        id: string;
        name: string;
        email: string;
        nextSession?: Date;
    }>;
}

export function ClientsList({ clients }: ClientsListProps) {
    return (
        <Card className="h-[calc(100vh-13rem)]">
            <CardHeader>
                <CardTitle>Clientes Recentes</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {clients.map((client) => (
                        <div
                            key={client.id}
                            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                        >
                            <div>
                                <div className="font-medium">{client.name}</div>
                                <div className="text-sm text-gray-500">{client.email}</div>
                            </div>
                            {client.nextSession && (
                                <div className="text-sm text-gray-500">
                                    Próxima sessão: {client.nextSession.toLocaleDateString()}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
