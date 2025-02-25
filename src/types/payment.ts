import { Product } from "./products.type";

export type Metadata = {
  orderId?: string;
  userId: string;
  products: Product[];
};

export type MetadataPix = Metadata & {
  totalPrice: number;
};