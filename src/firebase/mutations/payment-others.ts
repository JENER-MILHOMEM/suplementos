import { api } from "@/lib/axios/axios.config"
import { Product } from "@/types/products.type"

type paymentMutationType = {
  userId: string
  products: Product[]
}

export const paymentMutationOthers = async ({userId, products}: paymentMutationType) => {
  const res = await api.post('/api/payment', {
    userId, products
  })

  if (res.status === 200) return res.data
}