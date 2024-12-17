import { auth } from "@/firebase/firebase.admin";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    const { email, password } = data

    const userRecord = await auth.createUser({
      email,
      password,
    });

    await auth.setCustomUserClaims(userRecord.uid, { role: 'admin' })

    return NextResponse.json({
      data,
      status: 201
    })
  } catch (err) {
    return NextResponse.json({
      err,
      status: 403
    })
  }

}