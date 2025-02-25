import { stripe } from "@/services/stripe";
import { Metadata } from "../payment/others/route";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/services/firebase/firebase.config";
import Stripe from "stripe";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: Request) {

  const sig = req.headers.get("stripe-signature");
  const secretWebhook = process.env.STRIPE_WEBHOOK_KEY!;

  try {
    
    const rawBody = await req.arrayBuffer();
    const decodedBody = Buffer.from(rawBody);

    const event = stripe.webhooks.constructEvent(
      decodedBody,
      sig!,
      secretWebhook,
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const metadata = session.metadata as Metadata;

      const sessionDetails = await stripe.checkout.sessions.retrieve(
        session.id,
        {
          expand: ["payment_intent.payment_method"],
        },
      );

      const paymentIntent =
        sessionDetails.payment_intent as Stripe.PaymentIntent;
      const paymentMethod =
        paymentIntent.payment_method as Stripe.PaymentMethod;

      const paymentMethodType = paymentMethod.type;
      const paymentId = session.id;

      const { members, registration, ...restData } = metadata;

      if (registration && paymentMethodType != "boleto") {
        const students = registration.split(",").map((item) => item.trim());

        await Promise.all(
          students.map(async (student) => {
            await setDoc(doc(db, "students", student), {
              paymentId: paymentId,
              registration: student,
              createdAt: new Date().toISOString(),
            });
          }),
        );
      }

      if (members && paymentMethodType != "boleto") {
        await setDoc(doc(db, "payments", paymentId), {
          members: members.split(",").map((item) => item.trim()),
          ...restData,
          createdAt: new Date().toISOString(),
          paymentStatus: "succeeded",
          paymentMethod: paymentMethodType,
        });
      }

      if (!members) {
        await setDoc(doc(db, "payments", paymentId), {
          ...restData,
          createdAt: new Date().toISOString(),
          paymentStatus:
            paymentMethodType != "boleto" ? "succeeded" : "pending",
          paymentMethod: paymentMethodType,
        });
      }
    }

    if (event.type === "checkout.session.async_payment_succeeded") {
      const session = event.data.object;
      const paymentId = session.id;

      const updatedSession = await stripe.checkout.sessions.retrieve(paymentId);
      const metadata = updatedSession.metadata as Metadata;

      const sessionDetails = await stripe.checkout.sessions.retrieve(
        session.id,
        {
          expand: ["payment_intent.payment_method"],
        },
      );

      const paymentIntent =
        sessionDetails.payment_intent as Stripe.PaymentIntent;
      const paymentMethod =
        paymentIntent.payment_method as Stripe.PaymentMethod;

      const paymentMethodType = paymentMethod.type;

      const { members, registration, ...restData } = metadata;

      if (registration) {
        const students = registration.split(",").map((item) => item.trim());

        await Promise.all(
          students.map(async (student) => {
            await setDoc(doc(db, "students", student), {
              paymentId: paymentId,
              registration: student,
              createdAt: new Date().toISOString(),
            });
          }),
        );
      }

      if (members) {
        await setDoc(doc(db, "payments", paymentId), {
          members: members.split(",").map((item) => item.trim()),
          ...restData,
          createdAt: new Date().toISOString(),
          paymentStatus: "succeeded",
          paymentMethod: paymentMethodType,
        });
      }

      if (!members) {
        await setDoc(doc(db, "payments", paymentId), {
          ...restData,
          createdAt: new Date().toISOString(),
          paymentStatus: "succeeded",
          paymentMethod: paymentMethodType,
        });
      }
    }

    if (event.type === "checkout.session.async_payment_failed") {
      const session = event.data.object;
      const paymentId = session.id;

      await setDoc(doc(db, "payments", paymentId), {
        paymentStatus: "failed",
        updatedAt: new Date().toISOString(),
      });
    }

    return new Response(JSON.stringify({ received: true }), { status: 200 });
  } catch (err) {
    console.error("Erro no webhook", err);
    return new Response("Webhook error", { status: 400 });
  }
}
