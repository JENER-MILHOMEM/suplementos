import { getAllDocs } from "@/firebase/queries/get-all-docs";
import { Category } from "@/types/products.type";
import { use } from "react";
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
import { Button as BtnShad } from "@/components/ui/button"
import { deleteCategory } from '@/actions/deleteCategory'

const categoriesPromisse = getAllDocs("productCategories");

export const CategoryList = () => {

  const categories = use(categoriesPromisse) as Category[];

  return (
    <div className='flex flex-wrap gap-2'>
      {
        categories.length > 0 && categories.map((category) => (
          <AlertDialog key={category.id}>
            <AlertDialogTrigger asChild>
              <BtnShad variant="outline" className='hover:bg-red-100'>{category.name}</BtnShad>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Que deletar essa categoria?</AlertDialogTitle>
                <AlertDialogDescription>
                  Isso irá deletar a categoria e todos os produtos dela
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={() => deleteCategory(category.id!)}>Continuar</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ))
      }
    </div>
  )
}