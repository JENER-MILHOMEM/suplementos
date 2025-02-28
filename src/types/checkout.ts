import formSchema from "@/schemas/checkout";
import { z } from "zod";

export type FormValues = z.infer<typeof formSchema>