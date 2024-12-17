"use client"

import { useState } from 'react'
import { AuthForm } from './auth-form'

type FormOptionsType = {
  name: string, slug: Slug
}

type Slug = "signin" | "signup"

const formOptions : FormOptionsType[] = [
  { name: 'Entrar', slug: 'signin' },
  { name: 'Criar conta', slug: 'signup' },
]

export function AuthSlider() {

  const [activeForm, setActiveForm] = useState<Slug>(formOptions[0].slug)

  const handleFormClick = (slug: Slug) => {
    setActiveForm(slug)
  }

  return (
    <div className="mx-auto xl:w-1/4 flex flex-col items-center">
      <div className="flex overflow-x-auto pb-4 mb-6 gap-10">
        {formOptions.map((option) => (
          <button
            key={option.slug}
            onClick={() => handleFormClick(option.slug)}
            className={`text-lg font-medium whitespace-nowrap ${activeForm === option.slug
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-800'
              }`}
          >
            {option.name}
          </button>
        ))}
      </div>
      <AuthForm type={activeForm} />
    </div>
  )
}

