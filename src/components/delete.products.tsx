import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {MouseEvent} from 'react'
import {deleteProduct} from "@/firebase/mutations/products";
import toast from "react-hot-toast";

interface DeleteProps {
    children?: React.ReactNode
    id: string
}

export const DeleteProducts = ({id}: DeleteProps) => {
   async function  handleDelete(e: MouseEvent<HTMLElement>) {
        try {
            e.stopPropagation()

           const res = await deleteProduct(id)
            toast.success(res)
        }catch (err){
            console.error(err)
        }
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <button onClick={(e) => handleDelete(e)}>
                    Apagar
                </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Você tem certeza que quer excluir esse produto?</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction>Continuar</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
