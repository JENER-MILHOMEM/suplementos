import { useForm } from "react-hook-form"
import { Button } from "./button"
import { Input } from "./input-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { createUserSchema, CreateUserType } from "@/schemas/create-user-admin.schema"
import { createAdminUser } from "@/firebase/firebase-admin-mutations/create-admin"
import toast from "react-hot-toast"

export const CreateUser = () => {

  const {register, formState : {errors}, handleSubmit} = useForm<CreateUserType>({
    resolver: zodResolver(createUserSchema)
  })

  const onSubmit = async (data: CreateUserType) => {

    const res = await createAdminUser(data)
    
    if (res.status === 'ok') toast.success(res.message)
    if (res.status === 'error') toast.error(res.message)
    
  }

  return (
    <form className="max-w-md mx-auto mt-8" onSubmit={handleSubmit(onSubmit)}>
      <Input type="email" {...register('email')} label="Email" error={errors.email?.message}/>
      <Input type="password" {...register('password')} label="Senha" error={errors.password?.message}/>
      <Button type="submit">Criar usuário</Button>
    </form>
  )
}