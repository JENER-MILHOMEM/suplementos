import { collection, getDocs, query, where } from "@firebase/firestore"
import { db } from "../firebase"

type getPaymentsQueryType = {
  userId: string
}

export const getPaymentsQuery = async ({userId} : getPaymentsQueryType) => {

  const colRef = collection(db, 'payments')
  const q = userId ? query(colRef, where('userId', '==', userId)) : colRef
  const snapShot = await getDocs(q)

  return snapShot.docs.map(doc => ({
    id: doc.id,
    user_id: doc.data().userId,
    order_id: doc.data().order_id,
    status: doc.data().status,
    products: doc.data().products,
    receptedIn: doc.data().receptedIn,
    buy_infos: doc.data().buy_infos
  }))

}