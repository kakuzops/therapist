"use client";

import { useState } from "react";
import { DatePicker } from "./date-picker";

interface ClientDateWrapperProps {
  initialDate: Date;
}

export function ClientDateWrapper({ initialDate }: ClientDateWrapperProps) {
  const [selectedDate, setSelectedDate] = useState(initialDate);

  return (
    <div>
      <span className="font-semibold text-lg mb-4 block">Select Date</span>
      <DatePicker 
        selected={selectedDate} 
        onSelect={(date) => {
          setSelectedDate(date);
          // Aqui você pode adicionar lógica adicional quando a data for selecionada
          console.log("Selected date:", date);
        }} 
      />
    </div>
  );
}
