import formSchema from "@/schemas/checkout";
import { z } from "zod";

export type FormValues = z.infer<typeof formSchema>

export type FormValuesRes = {
  deliveryMethod: "delivery" | "pickup";
  fullName: string;
  email: string;
  phone: string;
  number?: string | undefined;
  cep?: string | undefined;
  street?: string | undefined;
  complement?: string | undefined;
  neighborhood?: string | undefined;
  city?: string | undefined;
  state?: string | undefined;
  reference?: string | undefined;
}