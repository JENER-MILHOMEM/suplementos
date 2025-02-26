import MercadoPagoConfig from "mercadopago";
import { NextResponse } from "next/server";
import crypto from "crypto";

export const mercadopago = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN! });

export function verifyMercadoPagoSignature(request: Request) {

  const xSignature = request.headers.get("x-signature");
  const xRequestId = request.headers.get("x-request-id");
  if (!xSignature || !xRequestId) {
    return NextResponse.json(
      { error: "Missing x-signature or x-request-id header" },
      { status: 400 }
    );
  }

  const signatureParts = xSignature.split(",");
  let ts = "";
  let v1 = "";
  signatureParts.forEach((part) => {
    const [key, value] = part.split("=");
    if (key.trim() === "ts") {
      ts = value.trim();
    } else if (key.trim() === "v1") {
      v1 = value.trim();
    }
  });

  if (!ts || !v1) {
    return NextResponse.json(
      { error: "Invalid x-signature header format" },
      { status: 400 }
    );
  }

  const url = new URL(request.url);
  const dataId = url.searchParams.get("data.id");

  let manifest = "";
  if (dataId) {
    manifest += `id:${dataId};`;
  }
  if (xRequestId) {
    manifest += `request-id:${xRequestId};`;
  }
  manifest += `ts:${ts};`;

  const secret = process.env.MP_WEBHOOK_KEY as string;
  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(manifest);
  const generatedHash = hmac.digest("hex");

  if (generatedHash !== v1) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }
}