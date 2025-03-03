import { createCategory } from '@/firebase/mutations/category'
import { zodResolver } from '@hookform/resolvers/zod'
import { Suspense } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { z } from 'zod'
import { Button } from './button'
import { Input } from './input-form'

import { useRouter } from 'next/navigation'
import { CategoryList } from './category-list'

const categorySchema = z.object({
    name: z.string().min(1, 'Categoria é obrigatória')
})

type CategoryFormData = z.infer<typeof categorySchema>

export const CategoryForm = () => {

    const route = useRouter()

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

            <Suspense fallback={<div>Carregando...</div>}>
                <CategoryList/>
            </Suspense>

        </form>
    )
}

