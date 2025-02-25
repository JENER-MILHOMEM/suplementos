import { Timestamp } from "@firebase/firestore";
import { Product } from "./products.type";

export type Metadata = {
  orderId?: string;
  userId: string;
  products: Product[];
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