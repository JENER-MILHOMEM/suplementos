"use client"

import StoreHours from "@/components/store-hours"

const Store = () => {

  return (
    <main className="py-8 w-full">
      <h1 className="text-3xl font-bold text-center mb-8">Gerenciamento de Horários da Loja</h1>
      <StoreHours />
    </main>
  )
}

export default Store