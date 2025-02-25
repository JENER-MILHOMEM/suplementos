import { mercadopago } from "@/mercadopago";
import { Metadata } from "@/types/payment";
import { Product } from "@/types/products.type";
import { Preference } from "mercadopago";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {

    const body = await request.json()

    const invalidProducts = body.products.filter((product: Product) => product.quantity <= 0);
     if( invalidProducts.length > 0) {
       return NextResponse.json( { error: "Alguns produtos estão com a quantidade inválida (<= 0)." },
           { status: 400 }
       );
     }
    const uuid = crypto.randomUUID();

    const metadata: Metadata = {
      orderId: uuid,
      userId: body.userId,
      products: body.products as Product[]
    }

    const preference = new Preference(mercadopago);

    const response = await preference.create({
      body: {
        items: metadata.products.map((product) => ({
          id: product.id!,
          title: product.name,
          unit_price: product.discountPrice ?? product.price,
          quantity: product.quantity   ,
          currency_id: "BRL",
        })),
        back_urls: {
          success: "https://seusite.com/success",
          failure: "https://seusite.com/failure",
          pending: "https://seusite.com/pending",
        },
        metadata: metadata,
        auto_return: "approved",
      },
    });

    return NextResponse.json({ url: response.sandbox_init_point ?? response.init_point }, { status: 200 });
  } catch (error) {
    console.error("Erro ao criar pagamento:", error);
    return NextResponse.json({ error: "Erro ao criar pagamento" }, { status: 500 });
  }
}
