'use server'

import { db } from "@/firebase/firebase.admin";
import { MutationRes } from "@/types/mutations-response.type";
import { Product } from "@/types/products.type";

export const deleteQuantityWhenResquestConfirmed = async (products: Product[]): Promise<MutationRes> => {
  try {
      for (const product of products) {
          if (!product.id) continue;

          await db.runTransaction(async (transaction) => {
              const docRef = db.doc(`products/${product.id}`);
              const quantityToDecrement = product.quantity;
              const docSnap = await transaction.get(docRef);

              if (!docSnap.exists) {
                  throw new Error('Documento não existe!');
              }

              const newStock = docSnap.data()!.quantity - quantityToDecrement;
              transaction.update(docRef, { quantity: newStock });
          })
      }

      return { message: "Quantidade de produtos atualizada com sucesso!", status: "ok" };
  } catch (error) {
      console.error("Erro ao atualizar a quantidade do produto:", error);
      return { message: "Não foi possível atualizar a quantidade do produto", status: "error", error };
  }
};