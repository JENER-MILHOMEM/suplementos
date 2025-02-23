import { auth } from "@/firebase/firebase";


export async function verifyIsAdmin(): Promise<boolean> {
  try {
    const token = await auth.currentUser?.getIdTokenResult()
    const isAdmin = token?.claims.role === 'admin'
    return isAdmin
  } catch (error) {
    throw new Error(`Erro ao buscar usuário`);
  }
}
