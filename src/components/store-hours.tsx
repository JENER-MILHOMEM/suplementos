import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import RegularHours from './regular-hours';
import Exceptions from './exceptions';
import StoreStatus from './store-status';

export type DayHours = {
  open: string | null;
  close: string | null;
};

export type WeekHours = {
  [key: string]: DayHours;
};

export type Exception = {
  date: string;
  open: string | null;
  close: string | null;
  reason?: string;
};

const initialWeekHours: WeekHours = {
  monday: { open: "07:00", close: "18:00" },
  tuesday: { open: "07:00", close: "18:00" },
  wednesday: { open: "07:00", close: "18:00" },
  thursday: { open: "07:00", close: "18:00" },
  friday: { open: "07:00", close: "18:00" },
  saturday: { open: "08:00", close: "14:00" },
  sunday: { open: null, close: null },
};

export default function StoreHours() {
  const [weekHours, setWeekHours] = useState<WeekHours>(initialWeekHours);
  const [exceptions, setExceptions] = useState<Exception[]>([]);

  const updateWeekHours = (day: string, hours: DayHours) => {
    setWeekHours(prev => ({ ...prev, [day]: hours }));
  };

  const addException = (exception: Exception) => {
    setExceptions(prev => [...prev, exception]);
  };

  const removeException = (date: string) => {
    setExceptions(prev => prev.filter(e => e.date !== date));
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 border">
      <h2 className="text-2xl font-bold mb-4">Horários da Loja</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-4">Horários Regulares</h3>
          <RegularHours weekHours={weekHours} updateWeekHours={updateWeekHours} />
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">Exceções</h3>
          <Exceptions exceptions={exceptions} addException={addException} removeException={removeException} />
        </div>
      </div>
      <div className="mt-8">
        <StoreStatus weekHours={weekHours} exceptions={exceptions} />
      </div>
      <Toaster />
    </div>
  );
}

