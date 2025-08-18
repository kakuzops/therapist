import { PacientForm } from "./_components/pacient-form";
import { PacientList } from "./_components/pacient-list";

export default function PacientPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start py-12 px-4">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <PacientForm />
        </div>
        <div>
          <PacientList />
        </div>
      </div>
    </div>
  );
}
