import { collection, getDocs } from "firebase/firestore"
import { db } from "../firebase"
import { WeekHours } from "@/components/store-hours"

export const getHours = async () => {

  const colRef = collection(db, 'weekHours')
  const snapShot = await getDocs(colRef)

  return snapShot.docs.reduce((acc, doc) => {
    acc[doc.id] = {
      open: doc.data().open,
      close: doc.data().close,
    };
    return acc;
  }, {} as WeekHours);

}