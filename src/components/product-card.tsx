import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DeleteProducts } from "./delete.products"
import { auth } from '@/firebase/firebase';
import useCartStore from '@/store/cart';
import { Product } from '@/types/products.type';
import { onAuthStateChanged } from 'firebase/auth';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Button } from './button';
import { Button as ButtonShad } from '@/components/ui/button'
import { Tag, DollarSign, Package, Settings, Info, ShoppingBasket } from 'lucide-react'
import React from "react";

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
                <div className="mt-auto">
                    <div className="flex justify-between items-end">
                        <div>
                            {product.discountPrice ? (
                                <div className="flex flex-col">
                                    <span className="flex items-center justify-center gap-2">
                                        <span className="text-gray-500 line-through">R$ {product.price.toFixed(2)}</span>
                                        <span className="text-gray-500 text-sm">{discount && discount.toFixed(2)}%</span>
                                    </span>
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
                                            <DeleteProducts id={product.id!}/>
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

type MoreInfoProductProps = {
    product: Product
    discount?: number
}

export const MoreInfoProduct = ({ product, discount }: MoreInfoProductProps) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <ButtonShad variant="outline" size="icon" className="w-1/2">
                    <Info className="h-4 w-4" />
                    <span className="sr-only">Mais informações</span>
                </ButtonShad>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{product.name}</DialogTitle>
                    <DialogDescription>Informações detalhadas do produto</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="relative w-full pt-[75%]">
                        <Image
                            src={product.imgUrl}
                            alt={product.name}
                            fill
                            className="rounded-lg object-cover"
                        />
                    </div>
                    <div className="grid grid-cols-[24px,1fr] items-center gap-2">
                        <Tag className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{product.category.name}</span>
                    </div>
                    <div className="grid grid-cols-[24px,1fr] items-start gap-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground mt-1" />
                        <div>
                            <span className="font-medium">R$ {product.price.toFixed(2)}</span>
                            {product.discountPrice && (
                                <>
                                    <span className="ml-2 text-sm text-muted-foreground line-through">
                                        R$ {product.discountPrice.toFixed(2)}
                                    </span>
                                    {discount && (
                                        <span className="ml-2 text-sm text-green-600">
                                            ({discount.toFixed(2)}% de desconto)
                                        </span>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                    <div className="grid grid-cols-[24px,1fr] items-center gap-2">
                        <Package className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{product.quantity} em estoque</span>
                    </div>
                    <div className="grid grid-cols-[24px,1fr] items-start gap-2">
                        <Info className="h-4 w-4 text-muted-foreground mt-1" />
                        <p className="text-sm text-muted-foreground">{product.description}</p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
