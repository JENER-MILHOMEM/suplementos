import { ProductsContent } from "@/components/products-content";
import { StoreBanner } from "@/components/store-banner";
import { RestaurantProps, StoreInfos } from "@/components/store-infos";
import { getAllDocs } from "@/firebase/queries/getAllDocs";
import { Product } from "@/types/products.type";

export default async function Home() {

  const store: RestaurantProps = {
    name: "ERI SUPLEMENTOS",
    address: "Avenida Não sei oq",
    imageUrl: '/logo_square.png',
    isClosed: true,
    openingTime: "18:00",
    deliveryOptions: ["Entrega", "Retirada"]
  };

  const products = await getAllDocs('products')
  

  return (
    <div className="mx-20 flex flex-col justify-center items-center">
      <StoreBanner />
      <StoreInfos storeInfos={store} />
      <div className="mt-20 w-full">
        <ProductsContent products={products as Product[]} />
      </div>
    </div>
  );
}
