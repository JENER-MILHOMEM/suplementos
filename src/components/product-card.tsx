import { Product } from '@/types/products.type';
import Image from 'next/image';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { Button } from './button';

interface ProductCardProps {
    produto: Product;
}

export function ProductCard({ produto }: ProductCardProps) {


    return (
        <div className='flex flex-col bg-white rounded-lg cursor-pointer shadow-md'>
            <Image
                src={produto.imgUrl}
                alt={produto.name}
                width={1000}
                height={1000}
                className='h-52 rounded-t-lg'
            />

            <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold mb-2 line-clamp-2">{produto.name}</h3>
                <p className="text-sm text-gray-600 mb-4 flex-grow line-clamp-3">{produto.shortDescription}</p>
                <div className="mt-auto">
                    <div className="flex justify-between items-end">
                        <div>
                            {produto.discountPrice ? (
                                <div className="flex flex-col">
                                    <span className="text-sm text-gray-500 line-through">R$ {produto.price}</span>
                                    <span className="text-xl font-bold text-green-600">R$ {produto.discountPrice}</span>
                                </div>
                            ) : (
                                <span className="text-lg font-bold">R$ {produto.price}</span>
                            )}
                        </div>
                        <span className="text-sm font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded">
                            {produto.category.name}
                        </span>
                    </div>
                </div>
                <Button className='mt-2'>Adicionar ao Carrinho</Button>
            </div>
        </div>

    );
}
