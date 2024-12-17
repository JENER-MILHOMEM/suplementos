import { useForm } from "react-hook-form"
import { Button } from "./button"
import { Input } from "./input-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { createUserAdmin } from "@/schemas/create-user-admin"
import { createAdminUser, CreateAdminUser } from "@/firebase/firebase-admin-mutations/create-admin"
import toast from "react-hot-toast"

export const CreateUser = () => {

  const {register, formState : {errors}, handleSubmit} = useForm<CreateAdminUser>({
    resolver: zodResolver(createUserAdmin)
  })

  const onSubmit = async (data: CreateAdminUser) => {

    const res = await createAdminUser(data)
    
    if (res.status === 'ok') toast.success(res.message)
    if (res.status === 'error') toast.error(res.message)
    
  }

  return (
    <form className="max-w-md mx-auto mt-8" onSubmit={handleSubmit(onSubmit)}>
      <Input {...register('email')} label="Email" error={errors.email?.message}/>
      <Input type="password" {...register('password')} label="Senha" error={errors.password?.message}/>
      <Button type="submit">Criar usuário</Button>
    </form>
  )
}