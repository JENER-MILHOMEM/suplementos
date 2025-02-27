import { db } from "@/firebase/firebase.admin";
import { NextResponse } from "next/server";

export async function GET() {

  const snap = await db.collection("products").get();
  
  const docs = snap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  
  return NextResponse.json({
    docs
  }, { status: 200 });
}