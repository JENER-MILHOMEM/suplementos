import { verifyIsAdmin } from "@/lib/utils"
import { MutationRes } from "@/types/mutations-response.type"
import { addDoc, collection } from "firebase/firestore"
import { db } from "../firebase"


export const createCategory = async (name: string) : Promise<MutationRes> => {
    try {

        const isAdmin = await verifyIsAdmin()

        if (!isAdmin) {
            return { message: "Você não tem permissão suficiente", status: 'error' }
        }

        await addDoc(collection(db, 'productCategories'), {
            name
        })

        return {message: "Categoria criada com sucesso!", status: 'ok'}

    } catch (error) {
        return {message: "Não foi possivel criar a categoria", status: 'error', error}
    }

}