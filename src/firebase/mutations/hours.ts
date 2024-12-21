import { DayHours, Exception } from "@/components/store-hours";
import { addDoc, collection, deleteDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { MutationRes } from "@/types/mutations-response.type";

export const updateWeekHour = async (day: string, hours: DayHours): Promise<MutationRes> => {
  try {
    await setDoc(doc(db, 'weekHours', day), hours)
    return { message: "Horario atualizado com sucesso", status: 'ok' }
  } catch (error) {
    return { message: "Erro ao atualizar o horario", status: 'error', error }
  }
}

export const createException = async (exception: Exception) : Promise<MutationRes> => {
  try {
    await addDoc(collection(db, 'exceptions'), exception)
    return { message: "Exceção criada com sucesso", status: 'ok' }
  } catch (error) {
    return { message: "Erro ao criar exceção", status: 'error', error }
  }
}

export const deleteException = async (exceptionId: string): Promise<MutationRes> => {
  try {
    await deleteDoc(doc(db, 'exceptions', exceptionId));
    return { message: "Exceção deletada com sucesso", status: 'ok' };
  } catch (error) {
    return { message: "Erro ao deletar exceção", status: 'error', error };
  }
};