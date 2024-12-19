'use client'

import { Product } from '@/types/products.type';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CategorySlider } from './category-slider';
import { ProductCard } from './product-card';
import Fuse from 'fuse.js';

type ProductsContentProps = {
  products: Product[]
}

export function ProductsContent({ products }: ProductsContentProps) {

  const searchParams = useSearchParams();
  const [produtosFiltrados, setProdutosFiltrados] = useState<Product[]>(products);
  const [categoriaAtiva, setCategoriaAtiva] = useState<string | null>('');

  useEffect(() => {
    const categoria = searchParams.get('categoria');
    const search = searchParams.get('search');
    setCategoriaAtiva(categoria);

    if (categoria) {
      setProdutosFiltrados(products.filter((product) => product.category.name === categoria));
    } else {
      setProdutosFiltrados(products);
    }

    if (search) {
      const fuse = new Fuse(products, {
        keys: [
          { name: 'name', weight: 0.7 },
          { name: 'category', weight: 0.2 },
          { name: 'description', weight: 0.1 },
        ],
        threshold: 0.3
      })

      const filtered = fuse.search(search).map(result => result.item)
      setProdutosFiltrados(filtered);
    }

  }, [searchParams]);

  return (
    <div className='w-full'>
      <p className='font-medium text-lg md:text-2xl pb-1 mb-1'>Categorias</p>
      <CategorySlider categoriaAtiva={categoriaAtiva || 'Todos'} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {produtosFiltrados.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

