import { api } from "@/lib/axios/axios.config"
import { Product } from "@/types/products.type"

export const getProductsMutation = async () => {

  const res = await api.get('/api/products')

  if (res.status === 200) return res.data

}