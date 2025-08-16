'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function CalendarCard() {
    return (
        <Card className="h-[calc(100vh-13rem)]">
            <CardHeader>
                <CardTitle>Calendário</CardTitle>
            </CardHeader>
            <CardContent>
                {/* Aqui você pode adicionar um componente de calendário como @fullcalendar/react ou react-big-calendar */}
                <div className="grid grid-cols-7 gap-2">
                    {Array.from({ length: 31 }, (_, i) => (
                        <div
                            key={i + 1}
                            className="aspect-square flex items-center justify-center p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
                        >
                            {i + 1}
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
