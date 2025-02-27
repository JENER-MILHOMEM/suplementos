"use server"

import { ProductsContent } from "@/components/products-content"
import { getProductsMutation } from "@/firebase/firebase-admin-mutations/get-products"
import { Product } from "@/types/products.type"

const Products = async () => {

  const {docs} = await getProductsMutation()
  return <ProductsContent products={docs as Product[]}/>

}

export default Products