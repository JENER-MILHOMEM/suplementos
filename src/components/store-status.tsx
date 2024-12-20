import { format, isWithinInterval, setHours, setMinutes } from 'date-fns';
import { Exception, WeekHours } from './store-hours';

type Props = {
  weekHours: WeekHours;
  exceptions: Exception[];
};

export default function StoreStatus({ weekHours, exceptions }: Props) {
  const now = new Date();
  const today = format(now, 'EEEE').toLowerCase();
  const currentDate = format(now, 'yyyy-MM-dd');

  const getStoreStatus = (): { status: 'open' | 'closed'; message: string } => {
    const exception = exceptions.find(e => e.date === currentDate);
    
    if (exception) {
      if (!exception.open || !exception.close) {
        return { status: 'closed', message: `Fechado hoje (${exception.reason || 'Exceção'})` };
      }
      const [openHour, openMinute] = exception.open.split(':').map(Number);
      const [closeHour, closeMinute] = exception.close.split(':').map(Number);
      const exceptionOpen = setHours(setMinutes(now, openMinute), openHour);
      const exceptionClose = setHours(setMinutes(now, closeMinute), closeHour);
      
      if (isWithinInterval(now, { start: exceptionOpen, end: exceptionClose })) {
        return { status: 'open', message: `Aberto até ${exception.close} (${exception.reason || 'Exceção'})` };
      } else {
        return { status: 'closed', message: `Fechado, abre ${exception.open} (${exception.reason || 'Exceção'})` };
      }
    }

    const regularHours = weekHours[today];
    if (!regularHours.open || !regularHours.close) {
      return { status: 'closed', message: 'Fechado hoje' };
    }

    const [openHour, openMinute] = regularHours.open.split(':').map(Number);
    const [closeHour, closeMinute] = regularHours.close.split(':').map(Number);
    const storeOpen = setHours(setMinutes(now, openMinute), openHour);
    const storeClose = setHours(setMinutes(now, closeMinute), closeHour);

    if (isWithinInterval(now, { start: storeOpen, end: storeClose })) {
      return { status: 'open', message: `Aberto até ${regularHours.close}` };
    } else {
      const nextDay = format(new Date(now.getTime() + 24 * 60 * 60 * 1000), 'EEEE').toLowerCase();
      const nextDayHours = weekHours[nextDay];
      return { status: 'closed', message: `Fechado, abre amanhã às ${nextDayHours.open || 'Fechado'}` };
    }
  };

  const { status, message } = getStoreStatus();

  return (
    <div className={`p-4 rounded-lg ${status === 'open' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
      <span className="font-bold text-lg">{status === 'open' ? 'Aberto' : 'Fechado'}</span>: {message}
    </div>
  );
}

