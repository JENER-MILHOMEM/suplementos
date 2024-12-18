import { REQUIRED_FIELD } from "@/constants";
import { z } from "zod";

export const createUserSchema = z.object({
  email: z.string({
    required_error: REQUIRED_FIELD
  }).email({
    message: "Deve ser um email válido"
  }),
  password: z.string({
    required_error: REQUIRED_FIELD
  }).min(6, "A senha deve conter no mínimo 6 caracteres")
})

export type CreateUserType = z.infer<typeof createUserSchema>