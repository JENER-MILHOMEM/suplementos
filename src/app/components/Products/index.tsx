import Image from "next/image";

export default function products(){
    return (

        <div className="container mx-auto px-4 py-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">PROMOÇÕES</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((item) => (
                    <div key={item} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                        <div className="aspect-square relative mb-4">
                            <Image
                                src="/placeholder.svg"
                                alt="Produto"
                                fill
                                className="object-cover rounded-lg"
                            />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800">Kit Whey Protein Premium</h3>
                        <p className="text-gray-600 mt-2">Kit com 2 unidades de Whey Protein Isolado</p>
                        <div className="flex items-center justify-between mt-4">
                            <div>
                                <span className="text-sm text-gray-500 line-through">R$ 299,90</span>
                                <p className="text-xl font-bold text-[#5FD4E3]">R$ 259,90</p>
                            </div>
                            <button className="bg-[#5FD4E3] text-white px-4 py-2 rounded-lg hover:bg-[#4BC0CF]">
                                Adicionar
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}