"use client"

import { auth } from "@/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { redirect } from "next/navigation";
import { ReactNode, useState } from "react";
import { Loading } from "./loading";

export const AdminGuard = ({ children } : { children: ReactNode }) => {

  const [isLoading, setIsLoading] = useState(false)
  const [isAdmin, setIsAdmin] = useState<boolean>()

  onAuthStateChanged(auth, async (user) => {
    setIsLoading(true)
    if (user){
      const token = await user.getIdTokenResult()
      if (token.claims.role === "admin")
        setIsAdmin(true)
      setIsLoading(false)
    }
  })

  if (isLoading) return <Loading/>
  if (!isAdmin) return redirect('/')

  return <>{children}</>
}