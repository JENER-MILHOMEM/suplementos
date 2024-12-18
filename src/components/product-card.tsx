import useCartStore from '@/store/cart';
import { Product } from '@/types/products.type';
import { Info, ShoppingBasket } from 'lucide-react';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { Button } from './button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"


interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const { addItem } = useCartStore()

    const addToCart = () => {
        addItem({ ...product, quantity: 1 })
        toast.success("Produto adicionado ao carrinho!")
    }

    const discount = product.discountPrice && ((product.discountPrice / product.price) - 1) * 100

    return (
        <div className='flex flex-col bg-white rounded-lg shadow-md border h-full max-w-[250px] mx-auto'>
            <div className="relative w-full pt-[75%] max-w-[250px] mx-auto">
                <Image
                    src={product.imgUrl}
                    alt={product.name}
                    fill
                    className='object-cover rounded-t-lg scale-90'
                />
            </div>

            <div className="p-3 flex flex-col flex-grow">
                <h3 className="text-base font-semibold mb-1 line-clamp-2">{product.name}</h3>
                <p className="text-gray-600 mb-2 flex-grow line-clamp-2">{product.shortDescription}</p>
                <div className="mt-auto">
                    <div className="flex justify-between items-end">
                        <div>
                            {product.discountPrice ? (
                                <div className="flex flex-col">
                                    <span className="text-gray-500 line-through">R$ {product.price.toFixed(2)}</span>
                                    <span className="text-gray-500 text-sm">{discount && discount.toFixed(2)}%</span>
                                    <span className="text-lg font-bold text-green-600">R$ {product.discountPrice.toFixed(2)}</span>
                                </div>
                            ) : (
                                <span className="text-sm font-bold">R$ {product.price.toFixed(2)}</span>
                            )}
                        </div>
                        <span className="text-xs font-medium text-blue-600 bg-blue-100 px-1 py-0.5 rounded">
                            {product.category.name}
                        </span>
                    </div>
                </div>
                <div className='mt-2 flex gap-2'>
                    <Button onClick={addToCart} className='text-sm py-1 flex items-center justify-center bg-green-700'><ShoppingBasket /></Button>
                    <MoreInfoProduct product={product} />
                </div>
            </div>
        </div>
    );
}

type MoreInfoProductProps = {
    product: Product
}

export const MoreInfoProduct = ({ product }: MoreInfoProductProps) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className='text-sm py-1 flex items-center justify-center bg-gray-50 border text-gray-600'><Info /></Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{product.name}</DialogTitle>
                    <DialogDescription>
                        {product.description}
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    )
}
