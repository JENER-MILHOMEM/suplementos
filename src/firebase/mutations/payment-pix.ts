import { api } from "@/lib/axios/axios.config"
import { Product } from "@/types/products.type"

type paymentMutationType = {
  userId: string
  totalPrice: number
  products: Product[]
}

export const paymentMutationPix = async ({userId, totalPrice, products}: paymentMutationType) => {
  const res = await api.post('/api/payment/pix', {
    userId, totalPrice, products
  })

  if (res.status === 200) return res.data
}