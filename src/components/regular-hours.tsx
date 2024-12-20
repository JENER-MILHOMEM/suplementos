import React from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { DayHours, WeekHours } from './store-hours';
import { Input } from './ui/input';

type Props = {
  weekHours: WeekHours;
  updateWeekHours: (day: string, hours: DayHours) => void;
};

export default function RegularHours({ weekHours, updateWeekHours }: Props) {
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  return (
    <div className="space-y-4">
      {days.map(day => (
        <div key={day} className="flex items-center space-x-4">
          <span className="w-28 font-medium">{format(new Date(2021, 0, days.indexOf(day) + 4), 'EEEE', { locale: ptBR })}:</span>
          <Input
            type="time"
            value={weekHours[day].open || ''}
            onChange={(e) => updateWeekHours(day, { ...weekHours[day], open: e.target.value })}
            className="border rounded px-2 py-1 w-24"
          />
          <span>-</span>
          <Input
            type="time"
            value={weekHours[day].close || ''}
            onChange={(e) => updateWeekHours(day, { ...weekHours[day], close: e.target.value })}
            className="border rounded px-2 py-1 w-24"
          />
        </div>
      ))}
    </div>
  );
}

