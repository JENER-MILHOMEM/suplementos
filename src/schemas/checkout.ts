import { z } from "zod"

const formSchema = z
  .object({
    deliveryMethod: z.enum(["delivery", "pickup"], {
      required_error: "Selecione um método de entrega",
    }),
    fullName: z.string().min(3, { message: "Nome deve ter pelo menos 3 caracteres" }),
    email: z.string().email({ message: "Email inválido" }),
    phone: z.string().min(11, { message: "Telefone deve ter pelo menos 11 dígitos" }),
    cep: z.string().length(8, { message: "CEP deve ter 8 dígitos" }).optional(),
    street: z.string().min(3, { message: "Rua é obrigatória" }).optional(),
    number: z.string().min(1, { message: "Número é obrigatório" }).optional(),
    complement: z.string().optional(),
    neighborhood: z.string().min(2, { message: "Bairro é obrigatório" }).optional(),
    city: z.string().min(2, { message: "Cidade é obrigatória" }).optional(),
    state: z.string().length(2, { message: "Estado deve ter 2 caracteres" }).optional(),
    reference: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.deliveryMethod === "delivery") {
        return !!data.cep && !!data.street && !!data.number && !!data.neighborhood && !!data.city && !!data.state
      }
      return true
    },
    {
      message: "Campos de endereço são obrigatórios para entrega",
      path: ["deliveryMethod"],
    },
  )

export default formSchema