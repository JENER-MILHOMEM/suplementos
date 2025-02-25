"use client"

import { auth } from "@/firebase/firebase";
import { getPaymentsQuery } from "@/firebase/queries/get-payments";
import { PaymentDetails } from "@/types/payment";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"


const Request = () => {

    const [payments, setPayments] = useState<PaymentDetails[]>()

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
            <h1 className="text-2xl font-bold mb-4">Seus Pedidos</h1>`
            {
                payments && payments.length > 0 ? payments.map((payment) => (
                    <Accordion key={payment.id} type="single" collapsible>
                        <AccordionItem value={payment.id}>
                            <AccordionTrigger>
                                <div className="flex justify-between w-full">
                                    <p className="font-semibold">Pedido - {payment.id}</p>
                                    <p>{format(new Date(payment.receptedIn.toDate()), 'dd/MM/yyyy', { locale: ptBR })}</p>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent>
                                {
                                    payment.products.map((product) => (
                                        <>
                                            <div key={product.id}>
                                                <p>{product.name} - {product.quantity}x</p>
                                            </div>
                                        </>
                                    ))
                                }
                                <p className="font-semibold">Total: R$ {payment.products.reduce((total, product) => total + (product.discountPrice || product.price) * product.quantity, 0)}</p>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                )) : <p className="text-lg">Seu carrinho está vazio.</p>
            }
        </div>
    )
}

export default Request