import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

interface Patient {
  id: string;
  name: string;
  email: string;
  imageUrl?: string;
}

interface PatientListProps {
  patients: Patient[];
  onSelectPatient: (patientId: string) => void;
}

export function PatientList({ patients, onSelectPatient }: PatientListProps) {
  return (
    <Card className="w-[300px] h-[800px]">
      <div className="p-4 font-semibold text-lg border-b">
        Pacientes
      </div>
      <ScrollArea className="h-[calc(100%-60px)]">
        <div className="p-4 space-y-4">
          {patients.map((patient) => (
            <Button
              key={patient.id}
              variant="ghost"
              className="w-full justify-start p-2 h-auto"
              onClick={() => onSelectPatient(patient.id)}
            >
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <img
                    src={patient.imageUrl || '/user-placeholder.png'}
                    alt={patient.name}
                    className="object-cover"
                  />
                </Avatar>
                <div className="flex flex-col items-start">
                  <span className="font-medium">{patient.name}</span>
                  <span className="text-sm text-muted-foreground">{patient.email}</span>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
}
