import { NextRequest, NextResponse } from "next/server";
import MercadoPagoConfig, { Preference } from "mercadopago";
import { Metadata } from "@/types/payment";
import { Product } from "@/types/products.type";

const mercadopago = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN! });

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
