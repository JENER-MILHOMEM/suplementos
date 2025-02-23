import { Product } from "./products.type";

export type Metadata = {
  orderId?: string;
  userId: string;
  products: Product[];
};