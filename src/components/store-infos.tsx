import React from 'react';
import { Clock, MapPin, Truck } from 'lucide-react';

export interface RestaurantProps {
    imageUrl: string
    name: string;
    address: string;
    isClosed: boolean;
    openingTime: string;
    deliveryOptions: string[];
}

export const StoreInfos = ({storeInfos} : {storeInfos: RestaurantProps}) => {
    
    const {name, address, deliveryOptions, isClosed, openingTime, imageUrl} = storeInfos

    return (
        <div className="w-full bg-white shadow-lg md:rounded-lg rounded-b-lg overflow-hidden mx-auto flex gap-5 items-center p-3 md:px-20 md:border">

            <img src={imageUrl} alt="logo eri suplementos" className='h-[80px] md:h-[150px]' />

            <div className="md:p-6 flex flex-col items-start">
                <h2 className="text-xl font-bold tracking-wider">{name}</h2>
                <div className="flex items-start text-sm md:text-lg">
                    <MapPin className="w-5 h-5 text-gray-500 mr-2 flex-shrink-0 mt-1" />
                    <p className="text-gray-600">{address}</p>
                </div>
                <div className="flex items-center text-sm md:text-lg">
                    <Clock className="w-5 h-5 text-gray-500 mr-2" />
                    <p className={`${isClosed ? 'text-red-500' : 'text-green-500'} font-semibold`}>
                        {isClosed ? `Loja Fechada, abre hoje às ${openingTime}` : 'Aberto'}
                    </p>
                </div>
                <div className="flex items-center text-sm md:text-lg">
                    <Truck className="w-5 h-5 text-gray-500 mr-2" />
                    <p className="text-gray-600">{deliveryOptions.join(' e ')}</p>
                </div>
            </div>
        </div>
    )
}

