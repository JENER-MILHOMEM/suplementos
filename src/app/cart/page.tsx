'use client'

import { useState, useEffect } from 'react'
import useCartStore from '@/store/cart'
import { CartItem } from '@/components/cart-item'
import { CartSummary } from '@/components/cart-summary'

export default function CartPage() {
  
  const { cart, cleanCart, minusQuantity, removeItem, plusQuantity } = useCartStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0)
  const totalPrice = cart.reduce((total, item) => total + (item.discountPrice || item.price) * item.quantity, 0)

  return (
    <div className="container mx-auto px-4 max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">Seu Carrinho de Compras</h1>
      {cart.length === 0 ? (
        <p className="text-lg">Seu carrinho está vazio.</p>
      ) : (
        <>
          <div className="space-y-2">
            {cart.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onIncrease={plusQuantity}
                onDecrease={minusQuantity}
                onRemove={removeItem}
              />
            ))}
          </div>
          <CartSummary
            totalItems={totalItems}
            totalPrice={totalPrice}
            onClearCart={cleanCart}
          />
        </>
      )}
    </div>
  )
}

