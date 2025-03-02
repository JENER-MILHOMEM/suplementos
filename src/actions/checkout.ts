"use server"

import { api } from "@/lib/axios/axios.config"
import { FormValues } from "@/types/checkout"
import { Product } from "@/types/products.type"

export const checkoutAction = async (data: FormValues, userId: string, products: Product[]) : Promise<{ message: string, status: string, url: string }> => {

  try {
    const filteredData = Object.fromEntries(Object.entries(data).filter(([key, value]) => value !== '')) as FormValues
    const res = await api.post('/api/payment', { buyInfos: filteredData, userId, products })
    
    return {
      message: 'Compra gerada com sucesso',
      status: 'ok',
      url: res.data.url
    }
    
  } catch (err: any) {
    throw new Error(err.response.data.error)
  }


}