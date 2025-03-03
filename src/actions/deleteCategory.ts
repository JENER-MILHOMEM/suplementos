"use server";

import { db } from "@/firebase/firebase.admin";

export const deleteCategory = async (id: string) => {
  try {

    //identificando a coleção
    const catCollection = db.doc(`productCategories/${id}`)

    //pegando o documento
    const category  = await catCollection.get()

    if (!category.exists) {
      throw new Error("Categoria nao encontrada")
    }

    //pegando os produtos da categoria
    const prodCollection = db.collection("products").where("category.id", "==", category.id)

    //coletando os documentos
    const querySnapshot = await prodCollection.get()

    if (querySnapshot.docs.length > 0) {
      console.log("Deletando os produtos da categoria");
      
      for (const doc of querySnapshot.docs) {
        await db.doc(`products/${doc.id}`).delete()
      }
    }

    //deletando a categoria
    await catCollection.delete()
    
  } catch (err) {
    console.error("Erro:", err);
  }
};