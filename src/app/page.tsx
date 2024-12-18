import { ProductsContent } from "@/components/products-content";
import { StoreBanner } from "@/components/store-banner";
import { RestaurantProps, StoreInfos } from "@/components/store-infos";
import { getAllDocs } from "@/firebase/queries/get-all-docs";
import { Product } from "@/types/products.type";

export default async function Home() {

  const store: RestaurantProps = {
    name: "ERI SUPLEMENTOS",
    address: "Avenida Não sei oq",
    imageUrl: '/logo_vetor.svg',
    isClosed: true,
    openingTime: "18:00",
    deliveryOptions: ["Entrega", "Retirada"]
  };

  const products = await getAllDocs('products')

  return (
    <div className="flex flex-col justify-center items-center">
      <StoreBanner />
      <StoreInfos storeInfos={store} />
      <div className="mt-5 md:mt-12 w-full">
        <ProductsContent products={products as Product[]} />
      </div>
    </div>
  );
}
