import { format, isWithinInterval, setHours, setMinutes } from 'date-fns';
import { Exception, WeekHours } from './store-hours';

type Props = {
  weekHours: WeekHours;
  exceptions: Exception[];
  className?: string
};

export default function StoreStatus({ weekHours, exceptions, className }: Props) {
  
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
      const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
      const nextDay = format(tomorrow, 'EEEE').toLowerCase();
      const tomorrowDate = format(tomorrow, 'yyyy-MM-dd');
      
      const tomorrowException = exceptions.find(e => e.date === tomorrowDate);
      
      if (tomorrowException) {
        if (!tomorrowException.open || !tomorrowException.close) {
          return { 
            status: 'closed', 
            message: `Fechado, amanhã fechado (${tomorrowException.reason || 'Exceção'})` 
          };
        }
        return { 
          status: 'closed', 
          message: `Fechado, abre amanhã às ${tomorrowException.open} (${tomorrowException.reason || 'Exceção'})` 
        };
      }
      
      const nextDayHours = weekHours[nextDay];
      return { 
        status: 'closed', 
        message: `Fechado, abre amanhã às ${nextDayHours.open || 'Fechado'}` 
      };
    }
  };

  const { status, message } = getStoreStatus();

  return (
    <p className={`${status === 'open' ? ' text-green-600' : ' text-red-600'} font-medium`}>{message}</p>
  );
}


