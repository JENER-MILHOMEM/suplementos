"use client"

import { auth } from "@/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { redirect } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { Loading } from "./loading";

export const AdminGuard = ({ children }: { children: ReactNode }) => {

  const [isLoading, setIsLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState<boolean>()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdTokenResult()
        if (token.claims.role === "admin")
          setIsAdmin(true)
        setIsLoading(false)
      }
    })

    return () => unsubscribe()
  }, [])

  if (isLoading) return <Loading />
  if (!isAdmin && !isLoading) return redirect('/')

  return <>{children}</>
}