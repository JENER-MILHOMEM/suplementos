import { formatCurrency } from "@/utils/format"
import { Button } from "./button"

interface CartSummaryProps {
  totalItems: number
  totalPrice: number
  onClearCart: () => void
}

export function CartSummary({ totalItems, totalPrice, onClearCart }: CartSummaryProps) {
  return (
    <div className="mt-4 space-y-2">
      <div className="flex justify-between text-sm">
        <span>Total de itens:</span>
        <span>{totalItems}</span>
      </div>
      <div className="flex justify-between font-semibold">
        <span>Total:</span>
        <span>{formatCurrency(totalPrice)}</span>
      </div>
      <div className="flex justify-between space-x-2">
        <Button
          onClick={onClearCart}
          className="w-full bg-red-500 text-white hover:bg-red-600 transition-colors"
        >
          Limpar
        </Button>
        <Button className="w-full bg-green-500 text-white hover:bg-green-600 transition-colors">
          Pagamento
        </Button>
      </div>
    </div>
  )
}

