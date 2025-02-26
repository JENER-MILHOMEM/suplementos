import { mercadopago } from "@/mercadopago";
import { Metadata } from "@/types/payment";
import { Product } from "@/types/products.type";
import { Preference } from "mercadopago";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {

    const body = await request.json()

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
          quantity: product.quantity,
          currency_id: "BRL",
        })),
        back_urls: {
          success: process.env.NEXT_PUBLIC_APP_URL + '/requests',
          failure: process.env.NEXT_PUBLIC_APP_URL + '/cart',
          pending: process.env.NEXT_PUBLIC_APP_URL + '/requests?status=pending',
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
