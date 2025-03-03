import { z } from "zod";

export const storeSchema = z.object({
  address: z.string({
    required_error: "Endereço é obrigatório",
    invalid_type_error: "Endereço deve ser uma string",
  }),
  deliveryTax: z.number({
    required_error: "Taxa de entrega é obrigatória",
    invalid_type_error: "Taxa de entrega deve ser um número",
  }),
  name: z.string({
    required_error: "Nome é obrigatório",
    invalid_type_error: "Nome deve ser uma string",
  }),
});