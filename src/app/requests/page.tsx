"use client"

import { auth } from "@/firebase/firebase";
import { getPaymentsQuery } from "@/firebase/queries/get-payments";
import { PaymentDetailsSnake } from "@/types/payment";
import { formatRelative, subDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

import { Box } from "lucide-react";


const Request = () => {

    const [payments, setPayments] = useState<PaymentDetailsSnake[]>()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                getPaymentsQuery({ userId: user.uid }).then((payments) => setPayments(payments))
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <div className="container mx-auto px-4 max-w-2xl">
            <h1 className="text-2xl font-bold mb-4">Seus Pedidos</h1>
            <div className="space-y-2 text-sm">
                {
                    payments && payments.length > 0 ? payments.map((payment) => (
                        <div className="border rounded-md p-5 border-gray-400 space-y-2">
                            <div className="flex justify-between">
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-2 font-medium text-sm">
                                        <Box className="text-primary" />
                                        <p>Pedido - {payment.id}</p>
                                    </div>
                                    <p className="text-sm">{formatRelative(subDays(new Date(payment.receptedIn.toDate()), 1), new Date(), { locale: ptBR })} </p>
                                </div>
                                <div className="flex items-center">
                                    <p>Total: R$ {payment.products.reduce((total, product) => total + (product.discountPrice || product.price) * product.quantity, 0)}</p>
                                </div>
                            </div>
                            <p>Produtos</p>

                            <div className="flex flex-col">
                                {
                                    payment.products.map((product) => (
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <img src={product.img_url} alt={product.name} className="w-7 h-7 rounded-md" />
                                                <div className="flex items-center gap-1">
                                                    <p className="text-xs text-gray-600">{product.quantity}x</p>
                                                    <p className="text-sm font-semibold">{product.name}</p>
                                                </div>
                                            </div>
                                            <p className="text-sm">R$ {product.discountPrice || product.price}</p>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    )) : <p className="text-lg">Seu carrinho está vazio.</p>
                }
            </div>
        </div>
    )
}

export default Request