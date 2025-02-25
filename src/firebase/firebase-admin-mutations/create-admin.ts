import { api } from "@/lib/axios/axios.config";
import { CreateUserType } from "@/schemas/create-user-admin.schema";
import { MutationRes } from "@/types/mutations-response.type";


export const createAdminUser = async ({ email, password }: CreateUserType): Promise<MutationRes> => {
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
