import { Timestamp } from "@firebase/firestore";
import { Product, ProductSnake } from "./products.type";
import { FormValues } from "./checkout";

export type Metadata = {
  orderId?: string;
  userId: string;
  products: Product[];
  buyInfos: FormValues
};

export type MetadataPix = Metadata & {
  totalPrice: number;
};

export type PaymentDetails = {
  id: string
  userId: string
  order_id: string
  status: string
  products: Product[]
  receptedIn: Timestamp;
}

//mercadopago transforma tudo em snake_case

export type FormValuesRes = {
  delivery_method: "delivery" | "pickup";
  full_name: string;
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

export type PaymentDetailsRes = {
  id: string
  user_id: string
  order_id: string
  status: string
  products: ProductSnake[]
  receptedIn: Timestamp
  buy_infos: FormValuesRes
}