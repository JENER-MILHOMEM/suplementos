import { editStore } from "@/actions/editStore"
import { Input } from "./input-form"
import { Button } from "./button"
import { useEffect, useState } from "react"
import { getStoreInfos } from "@/firebase/queries/get-store-infos"
import { useForm } from "react-hook-form"
import { storeSchema } from "@/schemas/store"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import toast from "react-hot-toast"

export const StoreForm = () => {

  const [storeInfos, setStoreInfos] = useState<StoreInfos>()
  type StoreInfosType = z.infer<typeof storeSchema>

  const onEditStore = async (data: StoreInfosType) => {
    const res = await editStore(data.address, data.deliveryTax)

    if (res.status === 'ok') toast.success(res.message)
  }

  const {register, formState : {errors}, handleSubmit, reset} = useForm<StoreInfosType>({
    resolver: zodResolver(storeSchema),
    defaultValues: {
      name: "",
      address: "",
      deliveryTax: 0
    }
  })

  useEffect(() => {
    if (storeInfos) {
      reset({
        name: storeInfos.name,
        address: storeInfos.address,
        deliveryTax: storeInfos.deliveryTax
      })
    }
  }, [storeInfos, reset])
  
  useEffect(() => {
    const getStore = () => {
      getStoreInfos().then((res) => setStoreInfos(res[0]))
    }

    getStore()
  }, [])

  return (
    <form onSubmit={handleSubmit(onEditStore)} className="max-w-md mx-auto space-y-3">
      <Input {...register('name')} type="text" label="Nome" error={errors.name?.message}/>
      <Input {...register('address')} type="text" label="Endereço" error={errors.address?.message}/>
      <Input {...register('deliveryTax', { valueAsNumber: true })} type="number" label="Taxa de entrega" name="deliveryTax" step={0.01} error={errors.deliveryTax?.message}/>
      <Button>Editar</Button>
    </form>
  )
  
}