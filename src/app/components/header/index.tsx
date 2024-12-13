import Image from "next/image";
import Logo from "@/app/imgs/LOGOnav.png";
import {FaSearch, FaShoppingCart} from "react-icons/fa";

export default function header(){
    return (
        <header className="border-b">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <a href="/">
                    <Image
                        src={Logo}
                        alt="Eri Suplementos Logo"
                        width={120}
                        height={60}
                        className="object-contain"
                    />
                </a>
                <div className="flex-1 max-w-xl px-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Buscar suplementos"
                            className="text-black w-full py-2 px-4 pr-10 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5FD4E3]"
                        />
                        <FaSearch className="absolute right-3 top-3 text-gray-400"/>
                    </div>
                </div>
                <div className="flex items-center space-x-6">
                    <a href="#" className="text-gray-700 hover:text-[#5FD4E3]">Início</a>
                    <a href="#" className="text-gray-700 hover:text-[#5FD4E3]">Pedidos</a>
                    <a href="/carrinho">
                        <button
                            className="bg-[#5FD4E3] text-white px-4 py-2 rounded-lg hover:bg-[#4BC0CF] flex items-center">
                            <FaShoppingCart className="mr-2"/>
                            Carrinho
                        </button>
                    </a>
                </div>
            </div>
        </header>
    )
}