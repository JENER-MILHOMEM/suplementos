import { Product } from '@/types/products.type';
import Image from 'next/image';

import { Button } from './button';
import useCartStore from '@/store/cart';
import toast from 'react-hot-toast';

interface ProductCardProps {
    produto: Product;
}

export function ProductCard({ produto }: ProductCardProps) {

    const {addItem} = useCartStore()

    const addToCart = () => {
        produto.quantity = 1
        addItem(produto)
        toast.success("Produto adicionado com sucesso!")
    }


    return (
        <div className='flex flex-col bg-white rounded-lg shadow-md border'>
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
                <Button onClick={addToCart} className='mt-2'>Adicionar ao Carrinho</Button>
            </div>
        </div>

    );
}
