"use client"

import { getAllDocs } from '@/firebase/queries/getAllDocs';
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
    router.push(slug ? `?categoria=${slug}` : '/', { scroll: false });
  };

  return (
    <div className="flex space-x-8 overflow-x-auto pb-4 mb-6">
      <button
        onClick={() => handleCategoryClick('')}
        className={`text-lg font-medium whitespace-nowrap ${categoriaAtiva === 'Todos'
            ? 'text-blue-600 border-b-2 border-blue-600'
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
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-800'
            }`}
        >
          {categoria.name}
        </button>
      ))}
    </div>
  );

}
