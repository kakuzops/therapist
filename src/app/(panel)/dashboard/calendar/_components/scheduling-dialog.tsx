import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { format } from 'date-fns';

interface SchedulingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSchedule: (data: SchedulingFormData) => void;
  selectedPatient?: { id: string; name: string };
  selectedTimeSlot?: { start: Date; end: Date };
}

interface SchedulingFormData {
  patientId: string;
  start: Date;
  end: Date;
  notes: string;
}

export function SchedulingDialog({
  isOpen,
  onClose,
  onSchedule,
  selectedPatient,
  selectedTimeSlot,
}: SchedulingDialogProps) {
  const [notes, setNotes] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPatient || !selectedTimeSlot) return;

    onSchedule({
      patientId: selectedPatient.id,
      start: selectedTimeSlot.start,
      end: selectedTimeSlot.end,
      notes,
    });

    setNotes('');
    onClose();
  };

  if (!selectedPatient || !selectedTimeSlot) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Agendar Consulta</DialogTitle>
          <DialogDescription>
            Agende uma consulta para {selectedPatient.name}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Data e Horário</Label>
              <Input
                readOnly
                value={format(selectedTimeSlot.start, "dd/MM/yyyy 'às' HH:mm")}
              />
            </div>
            <div className="space-y-2">
              <Label>Observações</Label>
              <textarea
                className="w-full min-h-[100px] px-3 py-2 border rounded-md"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Adicione observações sobre a consulta..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">Confirmar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
