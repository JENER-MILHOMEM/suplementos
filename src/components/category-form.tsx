"use client"

import { createCategory } from '@/firebase/mutations/category'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from './button'
import { Input } from './input-form'
import { toast } from 'react-hot-toast'

const categorySchema = z.object({
    name: z.string().min(1, 'Categoria é obrigatória')
})

type CategoryFormData = z.infer<typeof categorySchema>

export const CategoryForm = () => {

    const { register, handleSubmit, formState: { errors }} = useForm<CategoryFormData>({
        resolver: zodResolver(categorySchema),
    })

    const onSubmit = async (data: CategoryFormData) => {
        const { message, status } = await createCategory(data.name.toLocaleLowerCase())

        if (status == 'ok') toast.success(message)
        if (status == 'error') toast.error(message)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto mt-8">
            <Input
                label="Nome da categoria"
                {...register('name')}
                error={errors.name?.message}
            />
            <Button type='submit'>Adicionar Categoria</Button>
        </form>
    )
}

