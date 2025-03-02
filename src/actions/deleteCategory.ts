"use server";

import { db } from "@/firebase/firebase.admin";

export const deleteCategory = async (id: string) => {
  try {
    const batch = db.batch();
    const categoryRef = db.collection("productCategories").doc(id);
    
    // 1. Busca TODOS os produtos da categoria
    const productsQuery = db.collection("products").where("category", "==", id);
    const productsSnapshot = await productsQuery.get();

    // 2. Adiciona TODAS as deleções ao batch
    productsSnapshot.forEach((doc) => {
      batch.delete(doc.ref);
    });
    batch.delete(categoryRef);

    // 3. Executa todas as operações atomicamente
    await batch.commit();

    return { success: true, deletedProducts: productsSnapshot.size };
  } catch (err) {
    console.error("Erro:", err);
    return { 
      success: false, 
      error: err instanceof Error ? err.message : "Erro desconhecido" 
    };
  }
};