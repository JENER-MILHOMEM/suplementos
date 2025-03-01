import { collection, getDocs } from "@firebase/firestore"
import { db } from "../firebase"

export const getStoreInfos = async () => {

  const colRef = collection(db, 'store')
  const snapShot = await getDocs(colRef)

  return snapShot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as StoreInfos[]

}