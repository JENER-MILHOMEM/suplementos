import { Product } from '@/types/products.type';
import Image from 'next/image';
import { MoreInfoProduct } from "./more-info-products";

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {

    const discount = product.discountPrice && ((product.discountPrice / product.price) - 1) * 100

    return (
        <MoreInfoProduct product={product} discount={discount}>
            <div className='w-[150px] md:w-auto flex flex-col bg-white rounded-lg shadow-md border h-full max-w-[250px] mx-auto cursor-pointer hover:shadow-lg'>

                <div className="relative w-[150px] pt-[75%] md:w-[250px] mx-auto">
                    <Image
                        src={product.imgUrl}
                        alt={product.name}
                        fill
                        className='object-cover rounded-t-lg scale-90'
                    />
                </div>

                <div className="h-full flex items-end">
                    <div className="p-3 flex flex-col flex-grow">
                        <h3 className="text-xs md:text-base mb-1 line-clamp-2">{product.name}</h3>
                        <div >
                            <div className="flex flex-col md:flex-row justify-between md:items-end">
                                <div>
                                    {product.discountPrice ? (
                                        <div className="flex flex-col w-full">
                                            <span className="flex gap-2 w-full">
                                                <span className="text-xs md:text-base text-gray-500 line-through">R$ {product.price.toFixed(2)}</span>
                                                <span className="text-xs md:text-base text-gray-500">{discount && discount.toFixed(2)}%</span>
                                            </span>
                                            <div className="flex">
                                                <p className="text-2xl text-green-600">R$ {Math.floor(product.discountPrice)}</p>
                                                <p className="text-xs text-green-600">{product.discountPrice.toFixed(2).split('.')[1]}</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex">
                                            <p className="text-2xl">R$ {Math.floor(product.price)}</p>
                                            <p className="text-xs">{product.price.toFixed(2).split('.')[1]}</p>
                                        </div>
                                    )}
                                </div>
                                <span className="text-xs font-medium text-blue-600 bg-blue-100 px-1 py-0.5 rounded w-fit">
                                    {product.category.name}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </MoreInfoProduct>
    );
}

