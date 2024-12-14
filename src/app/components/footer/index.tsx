'use client'
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa'

export default  function Footer() {
    return (
        <footer className="bg-white border-t mt-12">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="font-bold text-lg mb-4 text-black">Sobre Nós</h3>
                        <p className="text-gray-600">
                            A Eri Suplementos é sua parceira na busca por uma vida mais saudável e ativa. Oferecemos os melhores suplementos do mercado.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-4 text-black">Links Rápidos</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-600 hover:text-[#5FD4E3]">Produtos</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-[#5FD4E3]">Promoções</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-[#5FD4E3]">Blog</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-[#5FD4E3]">Contato</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-4 text-black">Atendimento</h3>
                        <ul className="space-y-2">
                            <li className="text-gray-600">Segunda a Sexta: 9h - 18h</li>
                            <li className="text-gray-600">Sábado: 9h - 13h</li>
                            <li className="text-gray-600">Telefone: (11) 1234-5678</li>
                            <li className="text-gray-600">Email: contato@erisuplementos.com</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-4 text-black">Siga-nos</h3>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-600 hover:text-[#5FD4E3]"><FaFacebookF size={24} /></a>
                            <a href="#" className="text-gray-600 hover:text-[#5FD4E3]"><FaTwitter size={24} /></a>
                            <a href="#" className="text-gray-600 hover:text-[#5FD4E3]"><FaInstagram size={24} /></a>
                            <a href="#" className="text-gray-600 hover:text-[#5FD4E3]"><FaYoutube size={24} /></a>
                        </div>
                    </div>
                </div>
                <div className="border-t mt-8 pt-8 text-center">
                    <p className="text-gray-600">&copy; 2023 Eri Suplementos. Todos os direitos reservados.</p>
                </div>
            </div>
        </footer>
    )
}