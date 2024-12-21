import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteProduct } from "@/firebase/mutations/products";
import toast from "react-hot-toast";

interface DeleteProps {
    children?: React.ReactNode
    id: string
}

export const DeleteProducts = ({ id }: DeleteProps) => {

    const handleDeleteProduct = async () => {
        const res = await deleteProduct(id)
        res.error ? toast.error(res.message) : toast.success(res.message)
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <button
                    onClick={(e) => e.stopPropagation()}
                    className="w-full flex items-start">
                    Apagar
                </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Você tem certeza que quer excluir esse produto?</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteProduct}>Continuar</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
