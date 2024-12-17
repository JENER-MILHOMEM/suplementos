import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export const getProductById = async (id: string) => {

    const colRef = collection(db, 'products');
    const docRef = doc(colRef, id)
    const docSnap = await getDoc(docRef);


    if (!docSnap.exists()) {
        console.log("Documento não encontrado para o ID:", id);
        return null;
    }

    return { id: docSnap.id, ...docSnap.data() };
};
