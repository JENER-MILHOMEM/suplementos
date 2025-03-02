import { verifyIsAdmin } from "@/lib/utils"
import { MutationRes } from "@/types/mutations-response.type"
import { Product } from "@/types/products.type"
import { addDoc, collection, deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "../firebase"
import { db as dbAdmin } from "../firebase.admin"

export const createProduct = async ({ category, description, imgUrl, name, price, quantity, discountPrice }: Product): Promise<MutationRes> => {
    try {

        const isAdmin = await verifyIsAdmin()

        if (!isAdmin) {
            return { message: "Você não tem permissão suficiente", status: 'error' }
        }

        await addDoc(collection(db, 'products'), {
            category, description, imgUrl, name, price, quantity, discountPrice
        })

        return { message: "Produto criado com sucesso!", status: 'ok' }

    } catch (error) {
        console.log(error);
        return { message: "Não foi possivel criar o produto", status: 'error', error }
    }

}

export const updateProduct = async (
    id: string,
    updates: Partial<Product>
): Promise<MutationRes> => {
    try {
        const docRef = doc(db, 'products', id);

        await updateDoc(docRef, updates);
        return { message: "Produto atualizado com sucesso!", status: 'ok' };
    } catch (error) {
        return { message: "Não foi possível atualizar o produto", status: 'error', error };
    }
};
export const deleteProduct = async (id: string): Promise<MutationRes> => {
    try {
        const docRef = doc(db, 'products', id);
        await deleteDoc(docRef);
        return { message: "Produto deletado com sucesso!", status: 'ok' }
    } catch (error) {
        console.log(error)
        return { message: "Não foi possivel deletar o produto", status: 'error', error }
    }

}