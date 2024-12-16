import { addDoc, collection, updateDoc, doc  } from "firebase/firestore"
import { db } from "../firebase"
import { MutationRes } from "@/types/mutations-response.type"
import { Product } from "@/types/products.type"


export const createProduct = async ({category, description, imgUrl, name, price, shortDescription, quantity, discountPrice} : Product) : Promise<MutationRes> => {
    try {

        await addDoc(collection(db, 'products'), {
            category, description, imgUrl, name, price, shortDescription, quantity, discountPrice
        })

        return {message: "Produto criado com sucesso!", status: 'ok'}

    } catch (error) {
        return {message: "Não foi possivel criar o produto", status: 'error', error}
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
