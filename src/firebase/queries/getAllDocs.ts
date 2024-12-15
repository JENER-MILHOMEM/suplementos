import { collection, doc, getDoc, getDocs } from "firebase/firestore"
import { db } from "../firebase"

export const getAllDocs = async (docName: string) => {

    const colRef = collection(db, docName)
    const snapShot = await getDocs(colRef)

    return snapShot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }))

}