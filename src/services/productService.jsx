import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy
} from "firebase/firestore";
import { db } from "./firebase"; // Asegúrate de que la ruta sea correcta

class ProductService {
  constructor() {
    this.products = [];
    this.loading = false;
    this.error = null;
  }

  async getProducts() {
    try {
      this.loading = true;
      const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      this.products = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return this.products;
    } catch (error) {
      console.error("Error al obtener productos:", error);
      throw error;
    } finally {
      this.loading = false;
    }
  }

  async addProduct(productData) {
    try {
      const newProduct = {
        ...productData,
        price: parseFloat(productData.price),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const docRef = await addDoc(collection(db, "products"), newProduct);
      return { success: true, id: docRef.id };
    } catch (error) {
      console.error("Error al guardar producto:", error);
      return { success: false, error: error.message };
    }
  }

  async updateProduct(id, updateData) {
    try {
      const productRef = doc(db, "products", id);
      await updateDoc(productRef, {
        ...updateData,
        updatedAt: new Date(),
      });
      return { success: true };
    } catch (error) {
      console.error("Error al actualizar producto:", error);
      return { success: false, error: error.message };
    }
  }

  async deleteProduct(id) {
    try {
      const productRef = doc(db, "products", id);
      await deleteDoc(productRef);
      return { success: true };
    } catch (error) {
      console.error("Error al eliminar producto:", error);
      return { success: false, error: error.message };
    }
  }
}

const productManager = new ProductService();
export default productManager;
