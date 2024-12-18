'use client'

import { Product } from '@/types/products.type';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CategorySlider } from './category-slider';
import { ProductCard } from './product-card';

type ProductsContentProps = {
  products: Product[]
}

export function ProductsContent({products} : ProductsContentProps) {

  const searchParams = useSearchParams();
  const [produtosFiltrados, setProdutosFiltrados] = useState<Product[]>(products);
  const [categoriaAtiva, setCategoriaAtiva] = useState<string | null>('');

  useEffect(() => {
    const categoria = searchParams.get('categoria');
    setCategoriaAtiva(categoria);

    if (categoria) {
      setProdutosFiltrados(products.filter((product) => product.category.name === categoria));
    } else {
      setProdutosFiltrados(products);
    }
  }, [searchParams]);

  return (
    <div className='w-full'>
      <CategorySlider categoriaAtiva={categoriaAtiva || 'Todos'} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {produtosFiltrados.map((product) => (
          <ProductCard key={product.id} produto={product} />
        ))}
      </div>
    </div>
  );
}

