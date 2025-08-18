"use client";

import * as React from "react";
import { addMonths, format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay } from "date-fns";

interface DatePickerProps {
  selected: Date;
  onSelect: (date: Date) => void;
}

export function DatePicker({ selected, onSelect }: DatePickerProps) {
  const [currentMonth, setCurrentMonth] = React.useState(startOfMonth(selected));

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const dateFormat = "d";
  const days: React.ReactNode[] = [];
  let day = startDate;
  let formattedDate = "";

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, dateFormat);
      const cloneDay = day;
      days.push(
        <div
          className={`flex items-center justify-center w-8 h-8 rounded cursor-pointer ${isSameDay(day, selected) ? "bg-blue-900 text-white" : isSameMonth(day, monthStart) ? "text-gray-900" : "text-gray-400"}`}
          key={day.toString()}
          onClick={() => onSelect(cloneDay)}
        >
          {formattedDate}
        </div>
      );
      day = addDays(day, 1);
    }
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 w-full">
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => setCurrentMonth(addMonths(currentMonth, -1))} className="px-2 py-1 rounded hover:bg-gray-100">{'<'} </button>
        <span className="font-semibold">{format(currentMonth, "MMMM yyyy")}</span>
        <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className="px-2 py-1 rounded hover:bg-gray-100"> {'>'}</button>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-2 text-xs text-gray-500">
        {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => <div key={d} className="text-center">{d}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days}
      </div>
    </div>
  );
}
