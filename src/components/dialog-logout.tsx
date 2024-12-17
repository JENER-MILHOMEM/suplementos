import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { auth } from "@/firebase/firebase"
import { signOut } from "firebase/auth"
import { LogOut } from "lucide-react"
import toast from "react-hot-toast"

export const DialogLogout = () => {

  const logout = async () => {
    try {
      await signOut(auth)
      toast.success("Sucesso")
      window.location.reload()
    } catch (error) {
      toast.error("Erro ao sair da aplicação")
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <span className="flex gap-2 cursor-pointer"><LogOut className="w-5" /> sair</span>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Tem certeza que deseja sair?</AlertDialogTitle>
          <AlertDialogDescription>
            Você terá que fazer login novamente pra usar todos os recursos.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={logout}>Sair</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}