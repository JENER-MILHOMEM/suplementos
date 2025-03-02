'use server'

import { db } from "@/firebase/firebase"
import { Product } from "@/types/products.type"
import { doc, getDoc } from "@firebase/firestore"

type verifyProductQuantityResType = {
  status: 'ok' | 'error',
  message: string
}

export const verifyProductQuantity = async (product: Product) : Promise<verifyProductQuantityResType> => {

  const productRef = doc(db, 'products', product.id!)
  const productSnap = await getDoc(productRef)

  if (productSnap.exists()) {

    const productData = productSnap.data() as Product

    if (productData.quantity < product.quantity) {

      console.log("Quantidade do produto indisponivel");
      

      return {
        status: 'error',
        message: `Quantidade do produto indisponivel, disponivel: ${productData.quantity}`
      }
    }

    return {
      status: 'ok',
      message: 'Quantidade do produto disponivel'
    }
  }

  return {
    status: 'error',
    message: 'Produto não encontrado'
  }

}