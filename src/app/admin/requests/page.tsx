import { OrderCard } from "@/components/order-card"
import { getPaymentsQuery } from "@/firebase/queries/get-payments"

const RequestAdminPage = async () => {

  const requests = await getPaymentsQuery({})

  return (
    <div className="container mx-auto px-4 max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">Pedidos</h1>
      <OrderCard payments={requests}/>
    </div>
  )
}

export default RequestAdminPage