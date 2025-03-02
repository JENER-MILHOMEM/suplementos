"use client"

import { createCategory } from '@/firebase/mutations/category'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from './button'
import { Input } from './input-form'
import { toast } from 'react-hot-toast'
import { getAllDocs } from '@/firebase/queries/get-all-docs'
import { Category } from '@/types/products.type'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button as BtnShad } from "@/components/ui/button"
import { deleteCategory } from '@/actions/deleteCategory'
import { useRouter } from 'next/navigation'

const categorySchema = z.object({
    name: z.string().min(1, 'Categoria é obrigatória')
})

type CategoryFormData = z.infer<typeof categorySchema>

export const CategoryForm = () => {

    const [categories, setCategories] = React.useState<Category[]>([])
    const route = useRouter()

    const getCategories = async () => {
        const cat = await getAllDocs('productCategories')
        setCategories(cat as Category[])
    }

    useEffect(() => {
        getCategories()
    }, [])

    const { register, handleSubmit, formState: { errors } } = useForm<CategoryFormData>({
        resolver: zodResolver(categorySchema),
    })

    const onSubmit = async (data: CategoryFormData) => {
        const { message, status } = await createCategory(data.name.toLocaleLowerCase())

        if (status == 'ok') {
            toast.success(message)
            route.refresh()
        }
        if (status == 'error') toast.error(message)

    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto space-y-3">
            <Input
                label="Nome da categoria de produto"
                {...register('name')}
                error={errors.name?.message}
            />
            <Button type='submit'>Adicionar Categoria</Button>

            <div className='flex flex-wrap gap-2'>
                {
                    categories.length > 0 && categories.map((category) => (
                        <AlertDialog key={category.id}>
                            <AlertDialogTrigger asChild>
                                <BtnShad  variant="outline" className='hover:bg-red-100'>{category.name}</BtnShad>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Que deletar essa categoria?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Isso irá deletar a categoria e todos os produtos dela
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => deleteCategory(category.id!)}>Continuar</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    ))
                }
            </div>

        </form>
    )
}

