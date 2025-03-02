"use client"

import { auth } from "@/firebase/firebase";
import { getPaymentsQuery } from "@/firebase/queries/get-payments";
import { PaymentDetailsRes } from "@/types/payment";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

import { OrderCard } from "@/components/order-card";

const Request = () => {

    const [payments, setPayments] = useState<PaymentDetailsRes[]>()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                await getPaymentsQuery({ userId: user.uid }).then((payments) => setPayments(payments))
                setLoading(false)
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <div className="container mx-auto px-4 max-w-2xl">
            <h1 className="text-2xl font-bold mb-4">Seus Pedidos</h1>
            <OrderCard payments={payments} loading={loading} />
        </div>
    )
}

export default Request