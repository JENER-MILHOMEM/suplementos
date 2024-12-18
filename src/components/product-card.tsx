import { Product } from '@/types/products.type';
import Image from 'next/image';
import { Button } from './button';
import useCartStore from '@/store/cart';
import toast from 'react-hot-toast';

interface ProductCardProps {
    produto: Product;
}

export function ProductCard({ produto }: ProductCardProps) {
    const { addItem } = useCartStore()

    const addToCart = () => {
        addItem({ ...produto, quantity: 1 })
        toast.success("Produto adicionado com sucesso!")
    }

    return (
        <div className='flex flex-col bg-white rounded-lg shadow-md border h-full max-w-[250px] mx-auto'>
            <div className="relative w-full pt-[75%] max-w-[250px] mx-auto">
                <Image
                    src={produto.imgUrl}
                    alt={produto.name}
                    fill
                    className='object-cover rounded-t-lg'
                />
            </div>

            <div className="p-3 flex flex-col flex-grow">
                <h3 className="text-base font-semibold mb-1 line-clamp-2">{produto.name}</h3>
                <p className="text-xs text-gray-600 mb-2 flex-grow line-clamp-2">{produto.shortDescription}</p>
                <div className="mt-auto">
                    <div className="flex justify-between items-end">
                        <div>
                            {produto.discountPrice ? (
                                <div className="flex flex-col">
                                    <span className="text-xs text-gray-500 line-through">R$ {produto.price.toFixed(2)}</span>
                                    <span className="text-sm font-bold text-green-600">R$ {produto.discountPrice.toFixed(2)}</span>
                                </div>
                            ) : (
                                <span className="text-sm font-bold">R$ {produto.price.toFixed(2)}</span>
                            )}
                        </div>
                        <span className="text-xs font-medium text-blue-600 bg-blue-100 px-1 py-0.5 rounded">
                            {produto.category.name}
                        </span>
                    </div>
                </div>
                <Button onClick={addToCart} className='mt-2 text-sm py-1'>Adicionar ao Carrinho</Button>
            </div>
        </div>
    );
}

