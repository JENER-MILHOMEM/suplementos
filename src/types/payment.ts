import { Timestamp } from "@firebase/firestore";
import { Product, ProductSnake } from "./products.type";
import { FormValues, FormValuesRes } from "./checkout";

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

export type PaymentDetailsRes = {
  id: string
  user_id: string
  order_id: string
  status: string
  products: ProductSnake[]
  receptedIn: Timestamp
  buy_infos: FormValuesRes
}