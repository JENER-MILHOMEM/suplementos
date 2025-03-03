'use server'

import { db } from "@/firebase/firebase.admin"

export const editStore = async (address: string, deliveryTax: number) => {

  const docRef = db.collection('store').doc('infos')
  await docRef.update({ address, deliveryTax })

  return {
    message: "Loja atualizada com sucesso",
    status: 'ok'
  }

}