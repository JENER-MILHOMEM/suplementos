import {FaMapMarkerAlt} from "react-icons/fa";

export default function StoreInfo(){
    return (
        <div className="container mx-auto px-4 -mt-8 relative z-10">
            <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">ERI SUPLEMENTOS</h1>
                        <div className="flex items-center text-gray-600 mt-2">
                            <FaMapMarkerAlt className="mr-2"/>
                            <p>Frei serafim 698 nova caxias • <button className="text-[#5FD4E3]">Mais
                                informações</button></p>
                        </div>
                        <div className="mt-2">
                            <span className="text-green-600">Loja Aberta</span>
                            <span className="text-gray-600 ml-2">Entrega e Retirada</span>
                        </div>
                    </div>
                    <button className="bg-[#5FD4E3] text-white px-4 py-2 rounded-lg hover:bg-[#4BC0CF]">
                        Calcular taxa de entrega
                    </button>
                </div>
            </div>
        </div>
    )
}