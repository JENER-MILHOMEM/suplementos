import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { auth } from "@/firebase/firebase";
import useCartStore from "@/store/cart";
import { Product } from '@/types/products.type';
import { onAuthStateChanged } from "firebase/auth";
import { DollarSign, Info, Package, Tag } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "./button";
import { DeleteProducts } from "./delete.products";
import { Button as ButtonShad } from "./ui/button";

type MoreInfoProductProps = {
    product: Product
    discount?: number | null
    children?: React.ReactNode
}

export const MoreInfoProduct = ({ product, discount, children }: MoreInfoProductProps) => {

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

    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{product.name}</DialogTitle>
                    <DialogDescription>Informações detalhadas do produto</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                    <div className="relative w-full pt-[75%]">
                        <Image
                            src={product.imgUrl}
                            alt={product.name}
                            fill
                            className="rounded-lg object-cover w-auto h-auto"
                        />
                    </div>
                    <div className="grid grid-cols-[24px,1fr] items-center gap-2">
                        <Tag className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{product.category.name}</span>
                    </div>
                    <div className="grid grid-cols-[24px,1fr] items-start gap-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground mt-1" />
                        <div>
                            {product.discountPrice && (
                                <>
                                    <span className="ml-2">
                                        R$ {product.discountPrice.toFixed(2)}
                                    </span>
                                    {discount && (
                                        <span className="ml-2 text-sm text-green-600">
                                            ({discount.toFixed(2)}% de desconto)
                                        </span>
                                    )}
                                </>
                            )}

                            <span className="text-muted-foreground line-through">R$ {product.price.toFixed(2)}</span>
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
                    {
                        isAdmin ? (
                            <div className="flex w-full gap-3">
                                <ButtonShad
                                    onClick={() => route.push(`/admin/product/update/${product.id}`)}
                                    className="w-full"
                                >
                                    Editar Produto
                                </ButtonShad>
                                <DeleteProducts id={product.id!} />
                            </div>
                        ) : <Button className="disabled:cursor-not-allowed disabled:bg-gray-400" onClick={addToCart} disabled={product.quantity === 0}>{product.quantity === 0 ? "Produto esgotado" : "Adicionar ao carrinho"}</Button>
                    }
                </div>
            </DialogContent>
        </Dialog>
    )
}