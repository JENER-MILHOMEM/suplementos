
import Image from 'next/image'
import {  FaTrash, FaMinus, FaPlus } from 'react-icons/fa'
import Header from "@/app/components/header";

export default function CarrinhoPage() {

    const cartItems = [
        { id: 1, name: 'Whey Protein Isolado', price: 159.90, quantity: 2, image: '/placeholder.svg' },
        { id: 2, name: 'Creatina Monohidratada', price: 89.90, quantity: 1, image: '/placeholder.svg' },
        { id: 3, name: 'Pré-treino Energy Boost', price: 79.90, quantity: 1, image: '/placeholder.svg' },
    ]

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    const shipping = 15.90
    const total = subtotal + shipping

    return (
        <div className="min-h-screen bg-white">
            <div>
                <Header/>
            </div>

            {/* Cart Content */}
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Seu Carrinho</h1>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Cart Items */}
                    <div className="lg:w-2/3">
                        {cartItems.map((item) => (
                            <div key={item.id} className="flex items-center border-b py-4">
                                <Image src={item.image} alt={item.name} width={80} height={80}
                                       className="object-cover rounded"/>
                                <div className="ml-4 flex-1">
                                    <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                                    <p className="text-black">R$ {item.price.toFixed(2)}</p>
                                </div>
                                <div className="flex items-center">
                                    <button className="text-black hover:text-[#5FD4E3]"><FaMinus/></button>
                                    <span className="mx-2 text-lg">{item.quantity}</span>
                                    <button className="text-black hover:text-[#5FD4E3]"><FaPlus/></button>
                                </div>
                                <button className="ml-4 text-red-500 hover:text-red-700">
                                    <FaTrash/>
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:w-1/3">
                        <div className="bg-gray-50 rounded-lg p-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Resumo do Pedido</h2>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-black">Subtotal</span>
                                    <span className="font-semibold">R$ {subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-black">Frete</span>
                                    <span className="font-semibold">R$ {shipping.toFixed(2)}</span>
                                </div>
                                <div className="border-t pt-2 mt-2">
                                    <div className="flex justify-between">
                                        <span className="text-lg font-semibold">Total</span>
                                        <span
                                            className="text-lg font-semibold text-[#5FD4E3]">R$ {total.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                            <button
                                className="w-full bg-[#5FD4E3] text-white px-4 py-3 rounded-lg hover:bg-[#4BC0CF] mt-6">
                                Finalizar Compra
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
