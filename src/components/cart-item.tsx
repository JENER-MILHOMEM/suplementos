import Image from 'next/image'
import { Trash2, Plus, Minus } from 'lucide-react'
import { formatCurrency } from '@/utils/format'
import { Product } from '@/types/products.type'

interface CartItemProps {
  item: Product
  onIncrease: (id: string) => void
  onDecrease: (id: string) => void
  onRemove: (id: string) => void
}

export function CartItem({ item, onIncrease, onDecrease, onRemove }: CartItemProps) {
  return (
    <div className="flex items-center space-x-4 py-2 border-b">
      <Image src={item.imgUrl} alt={item.name} width={60} height={60} className="rounded-md" />
      <div className="flex-grow">
        <h3 className="font-semibold">{item.name}</h3>
        <p className="text-sm text-gray-600">{formatCurrency(item.discountPrice || item.price)}</p>
      </div>
      <div className="flex items-center space-x-2">
        <button onClick={() => onDecrease(item.id!)} className="p-1 bg-gray-200 rounded-full hover:bg-gray-300">
          <Minus size={14} />
        </button>
        <span className="text-sm font-semibold">{item.quantity}</span>
        <button onClick={() => onIncrease(item.id!)} className="p-1 bg-gray-200 rounded-full hover:bg-gray-300">
          <Plus size={14} />
        </button>
      </div>
      <button onClick={() => onRemove(item.id!)} className="text-red-500 hover:text-red-700">
        <Trash2 size={18} />
      </button>
    </div>
  )
}


