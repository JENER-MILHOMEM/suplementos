import { addDoc, collection } from "firebase/firestore"
import { db } from "../firebase"
import { MutationRes } from "@/types/mutations-response.type"

export const createCategory = async (name: string) : Promise<MutationRes> => {
    try {

        await addDoc(collection(db, 'productCategories'), {
            name
        })

        return {message: "Categoria criada com sucesso!", status: 'ok'}

    } catch (error) {
        return {message: "Não foi possivel criar a categoria", status: 'error', error}
    }

}