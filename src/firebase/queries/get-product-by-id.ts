import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export const getProductById = async (id: string) => {

    const colRef = collection(db, 'products');
    const docRef = doc(colRef, id); // Obter referência ao documento com o id fornecido
    const docSnap = await getDoc(docRef);


    if (!docSnap.exists()) {
        console.log("Documento não encontrado para o ID:", id);
        return null; // Retorna null ou uma resposta adequada caso o documento não seja encontrado
    }


    console.log('Dados do Documento:', docSnap.data());


    return { id: docSnap.id, ...docSnap.data() };
};
