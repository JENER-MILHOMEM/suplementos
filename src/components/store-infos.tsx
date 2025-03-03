import { getExceptionsQuery } from '@/firebase/queries/get-exceptions';
import { getHours as getHoursQuery } from "@/firebase/queries/get-hours";
import { Clock, MapPin, Truck } from 'lucide-react';
import StoreStatus from './store-status';

type StoreInfosComponentType = {
    store: StoreInfos
}

export const StoreInfos = async ({ store } : StoreInfosComponentType) => {

    const { name, address, deliveryTax, deliveryOptions } = store
    const hours = await getHoursQuery()
    const excep = await getExceptionsQuery()

    return (
        <div className="w-full bg-white shadow-lg md:rounded-lg rounded-b-lg overflow-hidden mx-auto flex gap-5 items-center p-3 md:px-20 md:border">

            <img src={'/logo_vetor.svg'} alt="logo eri suplementos" className='h-[70px] md:h-[100px]' />

            <div className="md:p-6 flex flex-col items-start">
                <h2 className="text-md md:text-xl font-bold tracking-wider">{name}</h2>
                <div className="flex items-start justify-center text-sm md:text-lg">
                    <MapPin className="w-4 md:w-5 md:h-5 text-gray-500 mr-2 flex-shrink-0" />
                    <p className="text-gray-600">{address}</p>
                </div>
                <div className="flex items-center text-sm md:text-lg">
                    <Clock className="w-4 md:w-5 md:h-5 text-gray-500 mr-2" />
                    {
                        hours && excep && <StoreStatus exceptions={excep} weekHours={hours} />
                    }
                </div>
                <div className="flex items-center text-sm md:text-lg">
                    <Truck className="w-4 md:w-5 md:h-5 text-gray-500 mr-2" />
                    <p className="text-gray-600">{deliveryOptions.join(' e ')}</p>
                </div>
            </div>
        </div>
    )
}

