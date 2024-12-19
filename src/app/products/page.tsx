import { ProductsContent } from "@/components/products-content"
import { getAllDocs } from "@/firebase/queries/get-all-docs"
import { Product } from "@/types/products.type"

const Products = async () => {

  const products = await getAllDocs('products')

  return <ProductsContent products={products as Product[]}/>

}

export default Products