import { deleteQuantityWhenResquestConfirmed } from "@/actions/updateQuantityProduct";
import { db } from "@/firebase/firebase.admin";
import { mercadopago, verifyMercadoPagoSignature } from "@/mercadopago";
import { Product } from "@/types/products.type";
import { Payment } from "mercadopago";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request: Request) {

  try {

    const body = await request.json();
    verifyMercadoPagoSignature(request);
    
    const { type, data } = body;

    switch (type) {

      case "payment":

        const payment = new Payment(mercadopago);
        const paymentData = await payment.get({ id: data.id });

        if (
          paymentData.status === "approved" || // Pagamento por cartão OU
          paymentData.date_approved !== null // Pagamento por Pix
        ) {

          const products: Product[] = paymentData.metadata.products || [];
          const paymentId = paymentData.id?.toString()!

          await db.collection("payments").doc(paymentId).set({
            id: paymentId,
            userId: paymentData.metadata.user_id || null,
            order_id: paymentData.metadata.order_id || null,
            status: "approved",
            products: paymentData.metadata.products || [],
            buyInfos: paymentData.metadata.buy_infos || {},
            receptedIn: new Date(),
          });

          await deleteQuantityWhenResquestConfirmed(products);

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
