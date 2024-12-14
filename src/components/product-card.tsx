import { Produto } from '../data/produtos';
import Image from 'next/image';
import { Button } from './button';

export function ProductCard({ produto }: { produto: Produto }) {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full">
            <div className="relative h-48">
                <Image
                    src={produto.imagem}
                    alt={produto.nome}
                    layout="fill"
                    objectFit="cover"
                />
            </div>
            <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold mb-2 line-clamp-2">{produto.nome}</h3>
                <p className="text-sm text-gray-600 mb-4 flex-grow line-clamp-3">{produto.descricao}</p>
                <div className="mt-auto">
                    <div className="flex justify-between items-end">
                        <div>
                            {produto.precoDesconto ? (
                                <div className="flex flex-col">
                                    <span className="text-sm text-gray-500 line-through">R$ {produto.preco.toFixed(2)}</span>
                                    <span className="text-lg font-bold text-green-600">R$ {produto.precoDesconto.toFixed(2)}</span>
                                </div>
                            ) : (
                                <span className="text-lg font-bold">R$ {produto.preco.toFixed(2)}</span>
                            )}
                        </div>
                        <span className="text-sm font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded">
                            {produto.categoria}
                        </span>
                    </div>
                    <Button className='mt-2'>Adicionar ao carrinho</Button>
                </div>
            </div>
        </div>
    );
}

