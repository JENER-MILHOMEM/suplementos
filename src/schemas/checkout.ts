import { z } from "zod";

const formSchema = z
  .object({
    deliveryMethod: z.enum(["delivery", "pickup"], {
      required_error: "Selecione um método de entrega",
    }),
    fullName: z.string().min(3, { message: "Nome deve ter pelo menos 3 caracteres" }),
    email: z.string().email({ message: "Email inválido" }),
    phone: z.string().min(11, { message: "Telefone deve ter pelo menos 11 dígitos" }),

    cep: z.string().optional(),
    street: z.string().optional(),
    number: z.string().optional(),
    complement: z.string().optional(),
    neighborhood: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    reference: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.deliveryMethod === "delivery") {
      const requiredFields: Record<string, { min?: number; length?: number; message: string }> = {
        cep: { length: 8, message: "CEP deve ter 8 dígitos" },
        street: { min: 1, message: "Rua deve ser preenchida" },
        number: { min: 1, message: "Número deve ser preenchido" },
        neighborhood: { min: 2, message: "Bairro deve ser preenchido" },
        city: { min: 2, message: "Cidade deve ser preenchida" },
        state: { length: 2, message: "Estado deve ter 2 caracteres" },
      };

      Object.entries(requiredFields).forEach(([field, rules]) => {
        const value = data[field as keyof typeof data];

        if (rules.length !== undefined && value?.length !== rules.length) {
          ctx.addIssue({
            code: "custom",
            message: rules.message,
            path: [field],
          });
        }

        if (rules.min !== undefined && (!value || value.length < rules.min)) {
          ctx.addIssue({
            code: "custom",
            message: rules.message,
            path: [field],
          });
        }
      });
    }
  });

export default formSchema;
