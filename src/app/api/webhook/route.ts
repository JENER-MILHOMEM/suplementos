import { db } from "@/firebase/firebase.admin";
import { mercadopago } from "@/mercadopago";
import { Payment } from "mercadopago";
import { NextRequest } from "next/server";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request: NextRequest) {

  try {
    const webHookSecret = process.env.WEBHOOK_SECRET;
    const chaveRecebida = request.headers.get("x-webhook-secret");
    if(webHookSecret !== chaveRecebida) {
      console.error("Tentativa de acesso ao webhook com chave inválida!");
      return new Response("webHook invalid", { status: 403 });
    }

    const body = await request.json();

    const { type, data } = body;

    switch (type) {
      case "payment":
        const payment = new Payment(mercadopago);
        const paymentData = await payment.get({ id: data.id });
        if (
          paymentData.status === "approved" || // Pagamento por cartão OU
          paymentData.date_approved !== null // Pagamento por Pix
        ) {
          const paymentId = paymentData.id?.toString()!
          await db.collection("payments").doc(paymentId).set({
            id: paymentId,
            userId: paymentData.metadata.user_id || null,
            order_id: paymentData.metadata.order_id || null,
            status: "approved",
            products: paymentData.metadata.products || [],
            receptedIn: new Date(),
          });
        }
        break;
      default:
        console.log("Unhandled event type:", type);
    }

    return new Response(JSON.stringify({ received: true }), { status: 200 });
  } catch (err) {
    console.error("Erro no webhook", err);
    return new Response("Webhook error", { status: 400 });
  }
}
