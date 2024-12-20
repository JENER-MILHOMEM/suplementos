import { verifyMaxRegistrations } from "@/services/queries/verifyMaxRegistrations";
import { stripe } from "@/services/stripe";
import { User } from "firebase/auth";
import { NextResponse } from "next/server";

export type Metadata = {
  id?: string;
  fullName: string;
  userId: string;
  registration: string | null;
  teamName: string | null;
  gameId: string;
  members: string | null;
};

type Product = {
  product_name: string;
  amount: number;
  metadata: Metadata;
  user: User;
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { amount, product_name, metadata, user }: Product = body;

    const origin = req.headers.get("origin");
    const host = req.headers.get("host");

    if (origin != host) {
      NextResponse.json({ error: "Acesso negado!" }, { status: 403 });
    }

    const successUrl = `${process.env.NEXT_PUBLIC_API_CLIENT_URL}/enrollment`;
    const cancelUrl = `${process.env.NEXT_PUBLIC_API_CLIENT_URL}/enrollment`;

    const canRegister = await verifyMaxRegistrations(metadata.gameId);

    if (!canRegister) {
      return NextResponse.json(
        { message: "O Número de inscrições ja atingiu o limite." },
        { status: 403 },
      );
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "boleto"],
      line_items: [
        {
          price_data: {
            currency: "brl",
            product_data: {
              name: product_name,
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
        {
          price_data: {
            currency: "brl",
            product_data: {
              name: "Tarifa de pagamento",
            },
            unit_amount: 200,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        fullName: metadata.fullName,
        userId: metadata.userId,
        registration: metadata.registration,
        teamName: metadata.teamName,
        gameId: metadata.gameId,
      },
      customer_email: user.email!,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Erro ao criar a sessão do Stripe:", error);
    return NextResponse.json(
      { message: "Erro ao criar a sessão do Stripe", error },
      { status: 500 },
    );
  }
}
