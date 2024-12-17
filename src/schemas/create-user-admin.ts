import { z } from "zod";

export const createUserAdmin = z.object({
  email: z.string({
    required_error: "Preencha esse campo"
  }).email({
    message: "Deve ser um email válido"
  }),
  password: z.string({
    required_error: "Preencha esse campo"
  }).min(6, "A senha deve conter no mínimo 6 caracteres")
})

export type CreateUserAdminType = z.infer<typeof createUserAdmin>