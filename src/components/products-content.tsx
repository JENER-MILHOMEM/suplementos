'use client'

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { produtos } from '../data/produtos';
import { CategorySlider } from './category-slider';
import { ProductCard } from './product-card';
import { Product } from '@/types/products.type';

export function ProductsContent() {

  const searchParams = useSearchParams();
  const [produtosFiltrados, setProdutosFiltrados] = useState<Product[]>(produtos);
  const [categoriaAtiva, setCategoriaAtiva] = useState('');

  useEffect(() => {
    const categoria = searchParams.get('categoria');
    setCategoriaAtiva(categoria || '');

    if (categoria) {
      setProdutosFiltrados(produtos.filter((produto) => produto.category === categoria));
    } else {
      setProdutosFiltrados(produtos);
    }
  }, [searchParams]);

  return (
    <>
      <CategorySlider categoriaAtiva={categoriaAtiva} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {produtosFiltrados.map((produto) => (
          <ProductCard key={produto.id} produto={produto} />
        ))}
      </div>
    </>
  );
}

