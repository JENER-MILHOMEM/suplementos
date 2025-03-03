"use client"
import React, { useState } from 'react'
import { CategoryForm } from './category-form'
import { ProductForm } from './product-form'
import { Category } from '@/types/products.type'
import { CreateUser } from './create-user-form'
import { StoreForm } from './store-form'

const formOptions = [
  { name: 'Categoria', slug: 'category' },
  { name: 'Produto', slug: 'product' },
  { name: 'Usuário (admin)', slug: 'user' },
  { name: 'Loja', slug: 'store' },
]

type FormSliderProps = {
  categories: Category[]
}

export function FormSlider({categories} : FormSliderProps) {

  const [activeForm, setActiveForm] = useState(formOptions[0].slug)

  const handleFormClick = (slug: string) => {
    setActiveForm(slug)
  }

  return (
    <div className="max-w-xl mx-auto">
      <div className="flex space-x-8 overflow-x-auto pb-4 mb-6 w-full justify-between">
        {formOptions.map((option) => (
          <button
            key={option.slug}
            onClick={() => handleFormClick(option.slug)}
            className={`text-lg font-medium whitespace-nowrap ${
              activeForm === option.slug
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            {option.name}
          </button>
        ))}
      </div>
      {activeForm === 'category' ? <CategoryForm /> : activeForm === 'product' ? <ProductForm categories={categories} /> : activeForm === 'store' ? <StoreForm /> : <CreateUser/>}
    </div>
  )
}

