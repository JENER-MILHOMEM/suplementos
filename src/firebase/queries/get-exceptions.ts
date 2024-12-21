import { Exception } from "@/components/store-hours"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../firebase"

export const getExceptionsQuery = async () => {

  const colRef = collection(db, 'exceptions')
  const snapShot = await getDocs(colRef)

  return snapShot.docs.map((doc) => ({
    id: doc.id,
    date: doc.data().date,
    open: doc.data().open,
    close: doc.data().close,
    reason: doc.data().reason,
  })) as Exception[]
}