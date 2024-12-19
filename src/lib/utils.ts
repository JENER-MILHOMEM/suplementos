import { auth } from "@/firebase/firebase";
import { clsx, type ClassValue } from "clsx";
import { UserRecord } from "firebase-admin/auth";
import { User } from "firebase/auth";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function verifyIsAdmin(): Promise<boolean> {
  try {
    const token = await auth.currentUser?.getIdTokenResult()
    const isAdmin = token?.claims.role === 'admin'
    return isAdmin
  } catch (error) {
    throw new Error(`Erro ao buscar usuário`);
  }
}
