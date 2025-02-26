import { Product } from '@/types/products.type';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ProductWithQuantity = Product & { initialQuantity: number };

interface CartState {
  cart: ProductWithQuantity[];
  addItem: (item: Product) => void;
  minusQuantity: (id: string) => void;
  removeItem: (id: string) => void;
  cleanCart: () => void;
  plusQuantity: (id: string) => void
}

const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      addItem: (item: Product) => {
        set((state) => {
          const existingProduct = state.cart.find((prod) => prod.id === item.id);

          if (existingProduct) {
            return {
              cart: state.cart.map((prod) =>
                prod.id === item.id
                  ? { 
                      ...prod, 
                      quantity: prod.quantity + item.quantity 
                    }
                  : prod
              ),
            };
          } else {
            return { 
              cart: [...state.cart, { ...item, initialQuantity: item.quantity }] 
            };
          }
        });
      },  
      minusQuantity: (id: string) => {
        set((state) => ({
          cart: state.cart.map((prod) =>
            prod.id === id
              ? { ...prod, quantity: Math.max(prod.quantity - 1, 1) }
              : prod
          ),
        }));
      },
      plusQuantity: (id: string) => {
        set((state) => ({
          cart: state.cart.map((prod) =>
            prod.id === id
              ? { ...prod, quantity: prod.quantity + 1 }
              : prod
          ),
        }));
      },
      removeItem: (id: string) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        }));
      },
      cleanCart: () => set({ cart: [] }),
    }),
    {
      name: 'cart',
    }
  )
);

export default useCartStore;

