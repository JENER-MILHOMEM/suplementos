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
import { Button } from "./ui/button";

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
                <Button className="w-full" variant={"destructive"}>Deletar Produto</Button>
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
