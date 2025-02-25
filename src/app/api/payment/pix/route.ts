import { auth } from "@/firebase/firebase.admin";
import { MetadataPix } from "@/types/payment";
import { Product } from "@/types/products.type";
import MercadoPagoConfig, { Payment } from "mercadopago";
import { NextRequest, NextResponse } from "next/server";

const mercadopago = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN! });

export async function POST(request: NextRequest) {
  try {

    const body = await request.json()

    const uuid = crypto.randomUUID();

    const metadata: MetadataPix = {
      orderId: uuid,
      userId: body.userId,
      totalPrice: body.totalPrice,
      products: body.products as Product[]
    }

    const user = await auth.getUser(body.userId)

    const payment = new Payment(mercadopago);

    const response = await payment.create({
      body: {
        payment_method_id: "pix",
        transaction_amount: metadata.totalPrice,
        description: metadata.products.map((product) => product.name).join(", "),
        payer: {
          email: user.email
        },
        metadata: metadata,
      },
    });

    console.log(response);

    return NextResponse.json({ url: response.point_of_interaction?.transaction_data?.ticket_url}, { status: 200 });
  } catch (error) {
    console.error("Erro ao criar pagamento:", error);
    return NextResponse.json({ error: "Erro ao criar pagamento" }, { status: 500 });
  }
}
