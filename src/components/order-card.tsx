import { PaymentDetailsRes } from "@/types/payment"
import { formatRelative, subDays } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Box } from "lucide-react"

type OrderCardType = {
  payments: PaymentDetailsRes[] | undefined
  loading: boolean
}

export const OrderCard = ({payments, loading}: OrderCardType) => {

  return (
    <div className="space-y-2 text-sm">
      {
        loading ? <p>Carregando...</p> : !loading && payments?.length === 0 ? <p>Você ainda não fez nenhum pedido.</p> : payments && payments.length > 0 && payments.map((payment) => (
          <div key={payment.id} className="border rounded-md border-gray-400 space-y-1">
            <div className="flex justify-between p-3.5 bg-gray-50 rounded-t">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 font-medium text-xs sm:text-sm">
                  <Box className="text-primary" />
                  <p>Pedido - {payment.id}</p>
                </div>
                <p className="text-xs sm:text-sm">{formatRelative(subDays(new Date(payment.receptedIn.toDate()), 1), new Date(), { locale: ptBR })} </p>
              </div>
              <div className="flex items-center text-xs sm:text-sm">
                <p>Total: R$ {payment.products.reduce((total, product) => total + (product.discountPrice || product.price) * product.quantity, 0)}</p>
              </div>
            </div>

            <p className="px-3.5 text-xs sm:text-sm">Produtos</p>

            <div className="flex flex-col p-3.5 pt-0">
              {
                payment.products.map((product) => (
                  <div key={product.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img src={product.img_url} alt={product.name} className="w-7 h-7 rounded-md" />
                      <div className="flex items-center gap-1">
                        <p className="text-xs text-gray-600">{product.quantity}x</p>
                        <p className="text-xs sm:text-sm font-semibold">{product.name}</p>
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm">R$ {product.discountPrice || product.price}</p>
                  </div>
                ))
              }
            </div>
          </div>
        ))
      }
    </div>
  )
}