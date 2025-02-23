import { formatCurrency } from "@/utils/format"
import { Button } from "./button"
import { paymentMutation } from "@/firebase/mutations/payment"
import { useState } from "react"
import { onAuthStateChanged, User } from "firebase/auth"
import { auth } from "@/firebase/firebase"
import useCartStore from "@/store/cart"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"

interface CartSummaryProps {
  totalItems: number
  totalPrice: number
  onClearCart: () => void
}

export function CartSummary({ totalItems, totalPrice, onClearCart }: CartSummaryProps) {

  const [user, setUser] = useState<User>()
  const { cart } = useCartStore()

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      setUser(user)
    }
  })

  const onPaymentPix = () => {
    window.open('https://pix.com.br', '_blank')
  }

  const onPayment = async () => {
    const res = await paymentMutation({
      userId: user?.uid || '',
      products: cart
    })

    if (res) {
      window.open(res.url, '_blank')
    }

  }

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
          className="w-[200px] bg-red-500 text-white hover:bg-red-600 transition-colors"
        >
          Limpar
        </Button>

        <Dialog>
          <DialogTrigger className="w-full">
            <Button className="w-full bg-green-500 text-white hover:bg-green-600 transition-colors">Continuar pagamento</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirmação de compra</DialogTitle>
              <DialogDescription>
                <div>
                  Voce está prestes a comprar os seguintes items:
                  {cart.map((item) => (
                    <div key={item.id}>
                      {item.quantity} x {item.name}
                    </div>
                  ))}
                  <b>total: {formatCurrency(totalPrice)}</b>
                </div>
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={onPaymentPix} className="bg-green-500" type="submit">Pix</Button>
              <Button onClick={onPayment}>Outras formas</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

