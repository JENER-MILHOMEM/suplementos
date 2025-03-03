import { PaymentDetailsRes } from "@/types/payment"
import { formatRelative, subDays } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Box } from "lucide-react"
import { Separator } from "./ui/separator"
import { Badge } from "./ui/badge"

type OrderCardType = {
  payments: PaymentDetailsRes[] | undefined
  loading?: boolean
}

export const OrderCard = ({ payments, loading }: OrderCardType) => {



  return (
    <div className="space-y-2 text-sm">
      {
        loading ? <p>Carregando...</p> : !loading && payments?.length === 0 ? <p>Nenhum Pedido</p> : payments && payments.length > 0 && payments.map((payment) => (
          <div key={payment.id} className="border rounded-md border-gray-400 space-y-1">
            <div className="flex justify-between p-3.5 bg-gray-50 rounded-t">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 font-medium text-xs sm:text-sm">
                  <Box className="text-primary" />
                  <p>Pedido - {payment.id}</p>
                </div>
                <p className="text-xs sm:text-sm">{formatRelative(new Date(payment.receptedIn.toDate()), new Date(), { locale: ptBR })} </p>
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

            <Separator />

            <div className="p-3.5 space-y-1">
              <div className="flex sm:flex-row flex-col sm:items-center justify-between">
                <p className="text-xs sm:text-sm"><b>Nome</b> {payment.buy_infos.full_name}</p>
                <Badge className="text-xs sm:text-sm" variant={"secondary"}>{payment.buy_infos.delivery_method === "delivery" ? "Entrega" : "Retirada"}</Badge>
              </div>

              {
                payment.buy_infos.delivery_method === "delivery" && (
                  <div className="flex sm:flex-row flex-col sm:items-center justify-between">
                    <p className="text-xs sm:text-sm"><b>Endereço</b> {payment.buy_infos.street}, {payment.buy_infos.neighborhood}, {payment.buy_infos.number}</p>
                    <p className="text-xs sm:text-sm"><b>cep</b> {payment.buy_infos.cep}</p>
                  </div>
                )
              }

              <div className="flex sm:flex-row flex-col sm:items-center justify-between">
                <p className="text-xs sm:text-sm"><b>Email</b> {payment.buy_infos.email}</p>
                <p className="text-xs sm:text-sm"><b>Telefone</b> {payment.buy_infos.phone}</p>
              </div>
            </div>

          </div>
        ))
      }
    </div>
  )
}