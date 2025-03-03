import { ProductsContent } from "@/components/products-content";
import { StoreBanner } from "@/components/store-banner";
import { StoreInfos } from "@/components/store-infos";
import { getAllDocs } from "@/firebase/queries/get-all-docs";
import { getStoreInfos } from "@/firebase/queries/get-store-infos";
import { Product } from "@/types/products.type";

export default async function Home() {

  const store = await getStoreInfos()
  const products = await getAllDocs('products')

  return (
    <div className="flex flex-col justify-center items-center">
      <StoreBanner />
      <StoreInfos store={store[0]} />
      <div className="mt-5 md:mt-12 w-full">
        <ProductsContent products={products as Product[]} />
      </div>
    </div>
  );
}
