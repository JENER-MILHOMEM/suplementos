import { ProductsContent } from "@/components/products-content";
import { StoreBanner } from "@/components/store-banner";
import { RestaurantProps, StoreInfos } from "@/components/store-infos";
import { Product } from "@/types/products.type";

const productsData: Product[] = [
  {
    id: '1',
    name: "Kit Whey Protein Premium",
    shortDescription: "Kit com 2 unidades de Whey Protein Isolado",
    price: 300,
    imgUrl: "https://product-data.raiadrogasil.io/images/3446808.webp",
    promotion: 0.1
  },
  {
    id: '2',
    name: "Whey Protein Premium Unidade",
    shortDescription: "Whey Protein Isolado",
    price: 150,
    imgUrl: "https://product-data.raiadrogasil.io/images/3446808.webp",
    promotion: 0.2
  },
  {
    id: '3',
    name: "Whey Protein Premium Unidade",
    shortDescription: "Whey Protein Isolado",
    imgUrl: "https://product-data.raiadrogasil.io/images/3446808.webp",
    price: 150
  },
]

export default function Home() {

  const store: RestaurantProps = {
    name: "ERI SUPLEMENTOS",
    address: "Avenida Não sei oq",
    imageUrl: '/logo_square.png',
    isClosed: true,
    openingTime: "18:00",
    deliveryOptions: ["Entrega", "Retirada"]
  };

  return (
    <div className="mx-20 flex flex-col justify-center items-center">
      <StoreBanner />
      <StoreInfos storeInfos={store} />
      <div className="mt-20">
        <ProductsContent />
      </div>
    </div>
  );
}
