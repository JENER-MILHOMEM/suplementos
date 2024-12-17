import { auth, googleAuthProvider } from "@/firebase/firebase"
import { createUserSchema, CreateUserType } from "@/schemas/create-user-admin.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { Button } from "./button"
import { Input } from "./input-form"

type AuthFormProps = {
  type: "signin" | "signup"
}

export const AuthForm = ({ type }: AuthFormProps) => {

  const { register, handleSubmit } = useForm<CreateUserType>({
    resolver: zodResolver(createUserSchema)
  })

  const route = useRouter()

  const onSubmit = async (data: CreateUserType) => {

    try {
      type === "signup" ?
        await createUserWithEmailAndPassword(auth, data.email, data.password) :
        await signInWithEmailAndPassword(auth, data.email, data.password)

      toast.success(type === "signin" ? "Login realizado com sucesso" : "Conta criada com sucesso")
      route.push('/')
    } catch (error) {
      toast.error(type === "signin" ? "Erro ao fazer login" : "Erro ao criar conta")
    }

  }

  const loginGoogle = async () => {
    await signInWithPopup(auth, googleAuthProvider)
    toast.success(type === "signin" ? "Login realizado com sucesso" : "Conta criada com sucesso")
    route.push('/')
  }

  return (
    <form className="w-full space-y-3" onSubmit={handleSubmit(onSubmit)}>

      <Input label="Email" {...register("email")} type="email" />
      <Input label="Senha" {...register("password")} type="password" />

      <Button>{type === "signin" ? "Entrar" : "Criar conta"}</Button>

      <Button onClick={loginGoogle} type="button" className="bg-red-500">Entrar com o google</Button>

    </form>
  )
}