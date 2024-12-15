import { Product } from '@/types/products.type';
import { Button } from './button';
import Image from 'next/image';

export function ProductCard({ produto }: { produto: Product }) {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full">
            <div className="relative h-48">
                <Image
                    src={produto.imgUrl}
                    alt={produto.name}
                    layout="fill"
                    objectFit="cover"
                />
            </div>
            <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold mb-2 line-clamp-2">{produto.name}</h3>
                <p className="text-sm text-gray-600 mb-4 flex-grow line-clamp-3">{produto.shortDescription}</p>
                <div className="mt-auto">
                    <div className="flex justify-between items-end">
                        <div>
                            {produto.discountPrice ? (
                                <div className="flex flex-col">
                                    <span className="text-sm text-gray-500 line-through">R$ {produto.price}</span>
                                    <span className="text-lg font-bold text-green-600">R$ {produto.discountPrice}</span>
                                </div>
                            ) : (
                                <span className="text-lg font-bold">R$ {produto.price}</span>
                            )}
                        </div>
                        <span className="text-sm font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded">
                            {produto.category.name}
                        </span>
                    </div>
                    <Button className='mt-2'>Adicionar ao carrinho</Button>
                </div>
            </div>
        </div>
    );
}

