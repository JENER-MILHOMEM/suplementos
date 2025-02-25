import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { auth } from '@/firebase/firebase';
import useCartStore from '@/store/cart';
import { Product } from '@/types/products.type';
import { onAuthStateChanged } from 'firebase/auth';
import { Settings, ShoppingBasket } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Button } from './button';
import { DeleteProducts } from "./delete.products";
import { MoreInfoProduct } from "./more-info-products";

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {


    const route = useRouter()
    const [isAdmin, setIsAdmin] = useState<boolean>(false)
    const { addItem } = useCartStore()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const token = await user.getIdTokenResult();
                setIsAdmin(token.claims.role === "admin");
            } else {
                setIsAdmin(false);
            }
        });

        return () => unsubscribe();
    }, [])

    const addToCart = () => {
        addItem({ ...product, quantity: 1 })
        toast.success("Produto adicionado ao carrinho!")
    }

    const discount = product.discountPrice && ((product.discountPrice / product.price) - 1) * 100

    return (
        <div className='w-[150px] md:w-auto flex flex-col bg-white rounded-lg shadow-md border h-full max-w-[250px] mx-auto'>
            <div className="relative w-[150px] pt-[75%] sm:w-[250px] mx-auto">
                <Image
                    src={product.imgUrl}
                    alt={product.name}
                    fill
                    className='object-cover rounded-t-lg scale-90'
                />
            </div>

            <div className="p-3 flex flex-col flex-grow">
                <h3 className="text-xs md:text-base font-semibold mb-1 line-clamp-2">{product.name}</h3>
                <div className="mt-auto">
                    <div className="flex flex-col md:flex-row justify-between md:items-end">
                        <div>
                            {product.discountPrice ? (
                                <div className="flex flex-col w-full">
                                    <span className="flex gap-2 w-full">
                                        <span className="text-xs md:text-base text-gray-500 line-through">R$ {product.price.toFixed(2)}</span>
                                        <span className="text-xs md:text-base text-gray-500">{discount && discount.toFixed(2)}%</span>
                                    </span>
                                    <span className="text-lg font-bold text-green-600">R$ {product.discountPrice.toFixed(2)}</span>
                                </div>
                            ) : (
                                <span className="text-lg font-bold">R$ {product.price.toFixed(2)}</span>
                            )}
                        </div>
                        <span className="text-xs font-medium text-blue-600 bg-blue-100 px-1 py-0.5 rounded w-fit">
                            {product.category.name}
                        </span>
                    </div>
                </div>
                <div className='mt-2 flex gap-2'>
                    {
                        !isAdmin ?
                            <Button
                                onClick={addToCart}
                                className='text-sm py-1 flex items-center justify-center bg-green-700'>
                                <ShoppingBasket />
                            </Button>
                            :
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        className='text-sm py-1 flex items-center justify-center'>
                                        <Settings />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56">
                                    <DropdownMenuLabel>Configurações</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem>
                                            <DeleteProducts id={product.id!} />
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <button
                                                className="w-full flex items-start"
                                                onClick={() => route.push(`/admin/product/update/${product.id}`)}
                                            >
                                                Editar
                                            </button>
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                    <DropdownMenuSeparator />
                                </DropdownMenuContent>
                            </DropdownMenu>
                    }
                    <MoreInfoProduct product={product} discount={discount} />
                </div>
            </div>
        </div>
    );
}

