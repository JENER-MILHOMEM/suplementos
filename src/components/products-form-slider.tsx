"use client"
import React, { useState } from 'react'
import { CategoryForm } from './category-form'
import { ProductForm } from './product-form'
import { Category } from '@/types/products.type'

const formOptions = [
  { name: 'Criar categoria', slug: 'category' },
  { name: 'Criar produto', slug: 'product' },
]

type FormSliderProps = {
  categories: Category[]
}

export function FormSlider({categories} : FormSliderProps) {

  const [activeForm, setActiveForm] = useState('category')

  const handleFormClick = (slug: string) => {
    setActiveForm(slug)
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="flex space-x-8 overflow-x-auto pb-4 mb-6 w-full">
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
      {activeForm === 'category' ? <CategoryForm /> : <ProductForm categories={categories} />}
    </div>
  )
}

