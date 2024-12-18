'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Input } from './input-form'
import { Category, Product } from '@/types/products.type'
import { TextArea } from './text-area'
import { createProduct, updateProduct } from '@/firebase/mutations/products'
import toast from 'react-hot-toast'

const productSchema = z.object({
  name: z.string().min(1, 'O nome do produto é obrigatório'),
  category: z.string(),
  shortDescription: z.string().min(1, 'A descrição curta é obrigatória'),
  description: z.string().min(1, 'A descrição é obrigatória'),
  price: z.number().positive('O preço deve ser um número positivo'),
  imgUrl: z.string().url('A URL da imagem é inválida'),
  discountPrice: z.number().positive('O preço com desconto deve ser um número positivo').optional(),
  quantity: z.number().min(0, 'A quantidade deve ser maior ou igual a zero'),
});

type ProductFormData = z.infer<typeof productSchema>
type ProductProps = {
  categories: Category[],
  product?: Product,

}

export const ProductForm = ({ categories, product }: ProductProps) => {

  const { register, handleSubmit, formState: { errors } } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: product ? {
      name: product.name,
      category: product.category.id,
      shortDescription: product.shortDescription,
      description: product.description,
      price: product.price,
      imgUrl: product.imgUrl,
      discountPrice: product.discountPrice,
      quantity: product.quantity
    } : {
      name: "",
      category: "",
      shortDescription: "",
      description: "",
      imgUrl: "",
    }
  })

  const onSubmit = async (data: ProductFormData) => {

    const category = categories.find((category) => category.id === data.category) || categories[0]

    const productData = {
      ...data,
      category,
    };

    const response = product && product.id ? await updateProduct(product.id, productData) : await createProduct(productData)

    if (response.status == 'ok') toast.success(response.message)
    if (response.status == 'error') toast.error(response.message)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto space-y-3">
      <Input
        label="Nome do Produto"
        {...register('name')}
        error={errors.name?.message}
      />
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
        <select
          {...register('category')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          {
            categories.map((category) => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))
          }
        </select>
        {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>}
      </div>
      <Input
        label="Descrição Curta"
        {...register('shortDescription')}
        error={errors.shortDescription?.message}
      />
      <TextArea
        label="Descrição"
        {...register('description')}
        error={errors.description?.message}
      />
      <Input
        label="Preço"
        type="number"
        step="0.01"
        {...register('price', { valueAsNumber: true })}
        error={errors.price?.message}
      />
      <Input
        label="Quantidade no estoque"
        type="number"
        step="0.010"
        {...register('quantity', { valueAsNumber: true })}
        error={errors.price?.message}
      />
      <Input
        label="URL da Imagem"
        {...register('imgUrl')}
        error={errors.imgUrl?.message}
      />
      <Input
        label="Preço com Desconto (opcional)"
        type="number"
        step="0.01"
        {...register('discountPrice', { valueAsNumber: true })}
        error={errors.discountPrice?.message}
      />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        {product ? "Atualizar Produto" :
          "Adicionar Produto"
        }
      </button>
    </form>

  )
}

