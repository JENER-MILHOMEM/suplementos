import { auth } from "@/firebase/firebase"
import { paymentMutationOthers } from "@/firebase/mutations/payment-others"
import { paymentMutationPix } from "@/firebase/mutations/payment-pix"
import useCartStore from "@/store/cart"
import { formatCurrency } from "@/utils/format"
import { onAuthStateChanged, User } from "firebase/auth"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { Button } from "./button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"

interface CartSummaryProps {
  totalItems: number
  totalPrice: number
  onClearCart: () => void
}

export function CartSummary({ totalItems, totalPrice, onClearCart }: CartSummaryProps) {

  const [user, setUser] = useState<User>()
  const { cart } = useCartStore()

  const route = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
      }
    });

    return () => unsubscribe();
  }, []);

  const onPaymentPix = async () => {
    if (!user) {
      toast.error("Voce precisa estar logado para realizar o pagamento")
      return route.push('/auth')
    }

    try {
      const response = await toast.promise(paymentMutationPix({
        userId: user?.uid || '',
        totalPrice,
        products: cart
      }), {
        error: 'Erro ao criar pagamento',
        loading: 'Criando pagamento...',
        success: 'Pagamento criado com sucesso'
      })

      if (response) {
        window.open(response.url, '_blank')
      }
    } catch (error) {
      toast.error('Erro ao criar pagamento')
    }
  }

  const onPayment = async () => {

    if (!user) {
      toast.error("Voce precisa estar logado para realizar o pagamento")
      return route.push('/auth')
    }

    try {
      const response = await toast.promise(paymentMutationOthers({
        userId: user?.uid || '',
        products: cart
      }), {
        error: 'Erro ao criar pagamento',
        loading: 'Criando pagamento...',
        success: 'Pagamento criado com sucesso'
      })

      if (response) {
        window.open(response.url, '_blank')
      }
    } catch (error) {
      toast.error('Erro ao criar pagamento')
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
          className="w-[200px] bg-red-500 text-white hover:bg-red-600 transition-colors text-xs md:text-sm"
        >
          Limpar
        </Button>

        <Dialog>
          <DialogTrigger className="w-full">
            <Button className="w-full bg-green-500 text-white hover:bg-green-600 transition-colors text-xs md:text-sm">Continuar pagamento</Button>
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
            <DialogFooter className="gap-2 md:gap-0">
              <Button onClick={onPaymentPix} className="bg-green-500" type="submit">Pix</Button>
              <Button onClick={onPayment}>Outras formas</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

