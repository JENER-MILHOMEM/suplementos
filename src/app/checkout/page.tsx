"use client"

import { Button } from "@/components/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import formSchema from "@/schemas/checkout"
import useCartStore from "@/store/cart"
import { FormValues } from "@/types/checkout"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { Textarea } from "@/components/ui/textarea"
import { useEffect, useState } from "react"
import { Separator } from "@/components/ui/separator"
import { getAddressCep } from "@/firebase/queries/get-address-cep"
import { getStoreInfos } from "@/firebase/queries/get-store-infos"

const Payment = () => {

  const { cart } = useCartStore()

  const [isLoading, setIsLoading] = useState(false)
  const [isAddressLoading, setIsAddressLoading] = useState(false)
  
  
  const subtotal = cart.reduce((acc, item) => {
    const itemPrice = item.discountPrice !== null && item.discountPrice !== undefined ? item.discountPrice : item.price
    return acc + itemPrice * item.quantity
  }, 0)
  
  const [storeInfos, setStoreInfos] = useState<StoreInfos>()
  const total = subtotal + (storeInfos?.deliveryTax || 0)

  useEffect(() => {
    const fetchStoreInfos = async () => {
      const infos = await getStoreInfos()
      setStoreInfos(infos[0])
    }
    fetchStoreInfos()
  })

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      deliveryMethod: "delivery",
      fullName: "",
      email: "",
      phone: "",
      cep: "",
      street: "",
      number: "",
      complement: "",
      neighborhood: "",
      city: "",
      state: "",
      reference: "",
    },
  })

  const fetchAddressByCep = async (cep: string) => {
    setIsAddressLoading(true)
    const address = await getAddressCep(cep)
    form.setValue("street", address.logradouro)
    form.setValue("neighborhood", address.bairro)
    form.setValue("city", address.localidade)
    form.setValue("state", address.uf)
    setIsAddressLoading(false)
  }

  const onSubmit = (FormData: FormValues) => {
    console.log(FormData);
    
  }

  const deliveryMethod = form.watch("deliveryMethod")
  const isDelivery = deliveryMethod === "delivery"

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-8 text-center">Finalizar Compra</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h2 className="text-xl font-semibold mb-4">Método de Recebimento</h2>

                <FormField
                  control={form.control}
                  name="deliveryMethod"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="delivery" />
                            </FormControl>
                            <FormLabel className="font-normal">Entrega no endereço</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="pickup" />
                            </FormControl>
                            <FormLabel className="font-normal">Retirar na loja</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h2 className="text-xl font-semibold mb-4">Dados Pessoais</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Nome Completo</FormLabel>
                        <FormControl>
                          <Input placeholder="Digite seu nome completo" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>E-mail</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="seu@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Telefone</FormLabel>
                        <FormControl>
                          <Input placeholder="(11) 99999-9999" {...field} />
                        </FormControl>
                        <FormDescription>Preferencialmente com WhatsApp</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {isDelivery && (
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h2 className="text-xl font-semibold mb-4">Endereço de Entrega</h2>

                  <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                    <FormField
                      control={form.control}
                      name="cep"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>CEP</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                placeholder="12345678"
                                {...field}
                                onChange={(e) => {
                                  field.onChange(e)
                                  if (e.target.value.length === 8) {
                                    fetchAddressByCep(e.target.value)
                                  }
                                }}
                              />
                              {isAddressLoading && <Loader2 className="h-4 w-4 animate-spin absolute right-3 top-3" />}
                            </div>
                          </FormControl>
                          <FormDescription>Digite apenas números</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="street"
                      render={({ field }) => (
                        <FormItem className="md:col-span-4">
                          <FormLabel>Rua</FormLabel>
                          <FormControl>
                            <Input placeholder="Nome da rua" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="number"
                      render={({ field }) => (
                        <FormItem className="md:col-span-1">
                          <FormLabel>Número</FormLabel>
                          <FormControl>
                            <Input placeholder="123" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="complement"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Complemento</FormLabel>
                          <FormControl>
                            <Input placeholder="Apto 101, Bloco B" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="neighborhood"
                      render={({ field }) => (
                        <FormItem className="md:col-span-3">
                          <FormLabel>Bairro</FormLabel>
                          <FormControl>
                            <Input placeholder="Nome do bairro" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem className="md:col-span-4">
                          <FormLabel>Cidade</FormLabel>
                          <FormControl>
                            <Input placeholder="Nome da cidade" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Estado</FormLabel>
                          <FormControl>
                            <Input placeholder="UF" maxLength={2} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="reference"
                      render={({ field }) => (
                        <FormItem className="md:col-span-6">
                          <FormLabel>Ponto de Referência (opcional)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Próximo ao mercado, casa azul, etc."
                              className="resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processando...
                  </>
                ) : (
                  "Finalizar Pedido"
                )}
              </Button>
            </form>
          </Form>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Resumo do Pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <img
                      src={item.imgUrl || "/placeholder.svg"}
                      alt={item.name}
                      className="h-20 w-20 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">Quantidade: {item.quantity}</p>
                      {item.discountPrice !== null && item.discountPrice !== undefined ? (
                        <div>
                          <p className="text-sm line-through text-muted-foreground">
                            R$ {(item.price * item.quantity).toFixed(2).replace(".", ",")}
                          </p>
                          <p className="font-medium text-primary">
                            R$ {(item.discountPrice * item.quantity).toFixed(2).replace(".", ",")}
                          </p>
                        </div>
                      ) : (
                        <p className="font-medium">R$ {(item.price * item.quantity).toFixed(2).replace(".", ",")}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>R$ {subtotal.toFixed(2).replace(".", ",")}</span>
                </div>
                {isDelivery ? (
                  <div className="flex justify-between">
                    <span>Frete</span>
                    <span>R$ {storeInfos?.deliveryTax.toFixed(2).replace(".", ",")}</span>
                  </div>
                ) : (
                  <div className="flex justify-between">
                    <span>Frete</span>
                    <span className="text-primary">Grátis (retirada na loja)</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>R$ {(isDelivery ? total : subtotal).toFixed(2).replace(".", ",")}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <p className="text-sm text-muted-foreground">
                {isDelivery
                  ? "Preencha seus dados ao lado para finalizar a compra."
                  : "Você escolheu retirar na loja. Preencha seus dados pessoais para finalizar."}
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )

}

export default Payment