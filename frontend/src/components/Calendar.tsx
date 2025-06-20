import React from 'react';

export default function Calendar() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const weeks: (number | null)[][] = [];
  let day = 1 - firstDay;
  for (let i = 0; i < 6; i++) {
    const week: (number | null)[] = [];
    for (let j = 0; j < 7; j++) {
      if (day < 1 || day > daysInMonth) {
        week.push(null);
      } else {
        week.push(day);
      }
      day++;
    }
    weeks.push(week);
  }

  const monthLabel = now.toLocaleString('default', { month: 'long', year: 'numeric' });
  const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  return (
    <div className="border rounded-md p-2 text-sm">
      <div className="text-center font-bold mb-2">{monthLabel}</div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((d) => (
          <div key={d} className="text-center font-semibold">
            {d}
          </div>
        ))}
        {weeks.flat().map((d, i) => (
          <div key={i} className="text-center h-6">
            {d || ''}
          </div>
        ))}
      </div>
    </div>
  );
}
