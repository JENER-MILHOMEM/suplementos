"use client"

import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Exceptions from './exceptions';
import RegularHours from './regular-hours';
import StoreStatus from './store-status';
import { createException, deleteException, updateWeekHour } from '@/firebase/mutations/hours';

export type DayHours = {
  open: string | null;
  close: string | null;
};

export type WeekHours = {
  [key: string]: DayHours;
};

export type Exception = {
  id?: string;
  date: string;
  open: string | null;
  close: string | null;
  reason?: string;
};

export default function StoreHours({ initialWeekHours, exceptionsData }: { initialWeekHours: WeekHours, exceptionsData: Exception[] }) {

  const [weekHours, setWeekHours] = useState<WeekHours>(initialWeekHours);
  const [exceptions, setExceptions] = useState<Exception[]>(exceptionsData);

  const updateWeekHours = async (day: string, hours: DayHours) => {
    const res = await updateWeekHour(day, hours)
    if (res.status === 'ok')
      setWeekHours(prev => ({ ...prev, [day]: hours }));
    toast.success(res.message)
  };

  const addException = async (exception: Exception) => {
    const res = await createException(exception)
    if (res.status === 'ok')
      setExceptions(prev => [...prev, exception]);
    toast.success(res.message)
  };

  const removeException = async (id: string) => {
    const res = await deleteException(id)
    if (res.status === 'ok')
      setExceptions(prev => prev.filter(e => e.id !== id));
    toast.success(res.message)
  };

  return (
    <div className="bg-white">
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
    </div>
  );
}

