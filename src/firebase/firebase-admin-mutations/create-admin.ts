import { MutationRes } from "@/types/mutations-response.type";
import { auth } from "../firebase.admin";
import { api } from "@/axios/axios.config";

export type CreateAdminUser = {
  email: string
  password: string
}

export const createAdminUser = async ({ email, password }: CreateAdminUser): Promise<MutationRes> => {
  try {

    await api.post('/api/create/admin', {
      email,
      password,
    })

    return { message: "User criado com sucesso!", status: "ok" }
  } catch (error) {
    return { message: "Falha ao criar o usuário", status: "error", error }

  }
}
