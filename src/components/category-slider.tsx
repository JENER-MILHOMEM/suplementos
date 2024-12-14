"use client"
import { useRouter } from 'next/navigation';

const categorias = [
  { nome: 'Todos', slug: '' },
  { nome: 'Proteína', slug: 'proteina' },
  { nome: 'Creatina', slug: 'creatina' },
  { nome: 'Termogênico', slug: 'termogenico' },
];

export function CategorySlider({ categoriaAtiva }: { categoriaAtiva: string }) {
  const router = useRouter();

  const handleCategoryClick = (slug: string) => {
    router.push(slug ? `?categoria=${slug}` : '/', { scroll: false });
  };

  return (
    <div className="flex space-x-8 overflow-x-auto pb-4 mb-6">
      {categorias.map((categoria) => (
        <button
          key={categoria.slug}
          onClick={() => handleCategoryClick(categoria.slug)}
          className={`text-lg font-medium whitespace-nowrap ${
            categoriaAtiva === categoria.slug
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          {categoria.nome}
        </button>
      ))}
    </div>
  );
}
