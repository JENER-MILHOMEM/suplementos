import { collection, getDocs } from "@firebase/firestore"
import { db } from "../firebase"

type getPaymentsQueryType = {
  userId: string
}

export const getPaymentsQuery = async ({userId} : getPaymentsQueryType) => {

  const colRef = collection(db, 'payments')
  const snapShot = await getDocs(colRef)

  return snapShot.docs.filter(doc => doc.data().userId === userId).map((doc) => ({
    id: doc.id,
    userId: doc.data().userId,
    order_id: doc.data().order_id,
    status: doc.data().status,
    products: doc.data().products,
    receptedIn: doc.data().receptedIn,
  }))

}