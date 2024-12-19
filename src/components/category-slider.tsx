"use client"

import { getAllDocs } from '@/firebase/queries/get-all-docs';
import { Category } from '@/types/products.type';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function CategorySlider({ categoriaAtiva }: { categoriaAtiva: string }) {

  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>()

  const getCategories = async () => {
    const cat = await getAllDocs('productCategories')
    setCategories(cat as Category[])
  }

  useEffect(() => {
    getCategories()
  }, [])

  const handleCategoryClick = (slug: string) => {
    router.push(slug ? `?categoria=${slug}` : '?', { scroll: false });
  };

  return (
    <div className="flex space-x-3 md:space-x-8 overflow-x-auto pb-4 mb-6">
      <button
        onClick={() => handleCategoryClick('')}
        className={`text-lg font-medium whitespace-nowrap ${categoriaAtiva === 'Todos'
            ? 'text-primary border-b-2 border-primary'
            : 'text-gray-600 hover:text-gray-800'
          }`}
      >
        Todos
      </button>
      {categories?.map((categoria: Category) => (
        <button
          key={categoria.id}
          onClick={() => handleCategoryClick(categoria.name)}
          className={`text-lg font-medium whitespace-nowrap ${categoriaAtiva === categoria.name
              ? 'text-primary border-b-2 border-primary'
              : 'text-gray-600 hover:text-gray-800'
            }`}
        >
          {categoria.name}
        </button>
      ))}
    </div>
  );

}
