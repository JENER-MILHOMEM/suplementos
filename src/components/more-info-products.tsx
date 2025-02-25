import { Button as ButtonShad } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Product } from '@/types/products.type';
import { DollarSign, Info, Package, Tag } from 'lucide-react';
import Image from 'next/image';

type MoreInfoProductProps = {
  product: Product
  discount?: number | null
}

export const MoreInfoProduct = ({ product, discount }: MoreInfoProductProps) => {
  return (
      <Dialog>
          <DialogTrigger asChild>
              <ButtonShad variant="outline" size="icon" className="w-1/2">
                  <Info className="h-4 w-4" />
                  <span className="sr-only">Mais informações</span>
              </ButtonShad>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                  <DialogTitle>{product.name}</DialogTitle>
                  <DialogDescription>Informações detalhadas do produto</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                  <div className="relative w-full pt-[75%]">
                      <Image
                          src={product.imgUrl}
                          alt={product.name}
                          fill
                          className="rounded-lg object-cover"
                      />
                  </div>
                  <div className="grid grid-cols-[24px,1fr] items-center gap-2">
                      <Tag className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{product.category.name}</span>
                  </div>
                  <div className="grid grid-cols-[24px,1fr] items-start gap-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground mt-1" />
                      <div>
                          <span className="font-medium">R$ {product.price.toFixed(2)}</span>
                          {product.discountPrice && (
                              <>
                                  <span className="ml-2 text-sm text-muted-foreground line-through">
                                      R$ {product.discountPrice.toFixed(2)}
                                  </span>
                                  {discount && (
                                      <span className="ml-2 text-sm text-green-600">
                                          ({discount.toFixed(2)}% de desconto)
                                      </span>
                                  )}
                              </>
                          )}
                      </div>
                  </div>
                  <div className="grid grid-cols-[24px,1fr] items-center gap-2">
                      <Package className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{product.quantity} em estoque</span>
                  </div>
                  <div className="grid grid-cols-[24px,1fr] items-start gap-2">
                      <Info className="h-4 w-4 text-muted-foreground mt-1" />
                      <p className="text-sm text-muted-foreground">{product.description}</p>
                  </div>
              </div>
          </DialogContent>
      </Dialog>
  )
}