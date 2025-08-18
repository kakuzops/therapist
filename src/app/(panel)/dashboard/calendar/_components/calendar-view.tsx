import { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Card } from '@/components/ui/card';
import { ptBR } from 'date-fns/locale';

interface CalendarViewProps {
  events: Array<{
    id: string;
    title: string;
    start: string;
    end: string;
  }>;
  onEventClick: (eventId: string) => void;
  onDateSelect: (start: Date, end: Date) => void;
}

export function CalendarView({ events, onEventClick, onDateSelect }: CalendarViewProps) {
  return (
    <Card className="p-4 flex-1 h-[800px] overflow-auto">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        locale={ptBR}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        weekends={true}
        events={events}
        select={(arg) => onDateSelect(arg.start, arg.end)}
        eventClick={(info) => onEventClick(info.event.id)}
        height="100%"
        slotMinTime="08:00:00"
        slotMaxTime="20:00:00"
      />
    </Card>
  );
}
