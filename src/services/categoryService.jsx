import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  where,
  onSnapshot,
} from "firebase/firestore";
import { db } from "./firebase"; // Asegúrate de que la ruta sea correcta

class CategoryService {
  constructor() {
    this.categories = [];
    this.loading = false;
    this.error = null;
    this.unsubscribe = null;
  }

  // Obtener todas las categorías desde Firebase
  async getCategories() {
    try {
      this.loading = true;
      this.error = null;

      const q = query(collection(db, "categories"), orderBy("order", "asc"));

      const querySnapshot = await getDocs(q);
      this.categories = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      this.loading = false;
      return this.categories;
    } catch (error) {
      this.error = error.message;
      this.loading = false;
      throw error;
    }
  }

  // Escuchar cambios en tiempo real
  subscribeToCategories(callback) {
    try {
      const q = query(collection(db, "categories"), orderBy("order", "asc"));

      this.unsubscribe = onSnapshot(q, (querySnapshot) => {
        this.categories = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        if (callback) callback(this.categories);
      });

      return this.unsubscribe;
    } catch (error) {
      this.error = error.message;
      throw error;
    }
  }

  // Detener la suscripción
  unsubscribeFromCategories() {
    if (this.unsubscribe) {
      this.unsubscribe();
      this.unsubscribe = null;
    }
  }

  // Obtener solo categorías activas (para el select del ProductForm)
  getActiveCategories() {
    return this.categories.filter((category) => category.isActive);
  }

  // Obtener categorías en formato para React Select
  getCategoriesForSelect() {
    return this.getActiveCategories().map((category) => ({
      value: category.id,
      label: category.name,
    }));
  }

  // Obtener categoría por ID
  getCategoryById(id) {
    return this.categories.find((category) => category.id === id);
  }

  // Agregar nueva categoría
  async addCategory(categoryData) {
    try {
      this.loading = true;
      this.error = null;

      const newCategory = {
        name: categoryData.name.trim(),
        description: categoryData.description?.trim() || "",
        order: categoryData.order || (await this.getNextOrder()),
        isActive: categoryData.isActive ?? true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Validar antes de guardar
      await this.validateCategory(newCategory);

      const docRef = await addDoc(collection(db, "categories"), newCategory);

      this.loading = false;
      return {
        success: true,
        id: docRef.id,
        category: { id: docRef.id, ...newCategory },
      };
    } catch (error) {
      this.loading = false;
      this.error = error.message;
      return { success: false, error: error.message };
    }
  }

  // Actualizar categoría
  async updateCategory(id, updateData) {
    try {
      this.loading = true;
      this.error = null;

      const categoryRef = doc(db, "categories", id);
      const updatedData = {
        ...updateData,
        updatedAt: new Date(),
      };

      // Validar antes de actualizar
      if (updateData.name) {
        await this.validateCategory({ ...updateData, id });
      }

      await updateDoc(categoryRef, updatedData);

      this.loading = false;
      return { success: true };
    } catch (error) {
      this.loading = false;
      this.error = error.message;
      return { success: false, error: error.message };
    }
  }

  // Eliminar categoría
  async deleteCategory(id) {
    try {
      this.loading = true;
      this.error = null;

      // Verificar si hay productos asociados
      const hasProducts = await this.checkCategoryHasProducts(id);
      if (hasProducts) {
        throw new Error(
          "No se puede eliminar una categoría que tiene productos asociados"
        );
      }

      const categoryRef = doc(db, "categories", id);
      await deleteDoc(categoryRef);

      this.loading = false;
      return { success: true };
    } catch (error) {
      this.loading = false;
      this.error = error.message;
      return { success: false, error: error.message };
    }
  }

  // Verificar si la categoría tiene productos
  async checkCategoryHasProducts(categoryId) {
    try {
      const q = query(
        collection(db, "products"),
        where("categoryId", "==", categoryId)
      );

      const querySnapshot = await getDocs(q);
      return !querySnapshot.empty;
    } catch (error) {
      console.error("Error checking category products:", error);
      return false;
    }
  }

  // Validar datos de categoría
  async validateCategory(category) {
    if (!category.name || category.name.trim().length === 0) {
      throw new Error("El nombre de la categoría es requerido");
    }

    if (category.name.length > 50) {
      throw new Error("El nombre no puede exceder 50 caracteres");
    }

    // Verificar nombres duplicados
    const q = query(
      collection(db, "categories"),
      where("name", "==", category.name.trim())
    );

    const querySnapshot = await getDocs(q);
    const existingCategory = querySnapshot.docs.find(
      (doc) => doc.id !== category.id
    );

    if (existingCategory) {
      throw new Error("Ya existe una categoría con ese nombre");
    }

    return true;
  }

  // Obtener el siguiente número de orden
  async getNextOrder() {
    try {
      const q = query(collection(db, "categories"), orderBy("order", "desc"));

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        return 1;
      }

      const lastCategory = querySnapshot.docs[0].data();
      return (lastCategory.order || 0) + 1;
    } catch (error) {
      console.error("Error getting next order:", error);
      return 1;
    }
  }

  // Reordenar categorías
  async reorderCategories(categoryIds) {
    try {
      this.loading = true;
      this.error = null;

      const batch = [];

      for (let i = 0; i < categoryIds.length; i++) {
        const categoryRef = doc(db, "categories", categoryIds[i]);
        batch.push(
          updateDoc(categoryRef, {
            order: i + 1,
            updatedAt: new Date(),
          })
        );
      }

      await Promise.all(batch);

      this.loading = false;
      return { success: true };
    } catch (error) {
      this.loading = false;
      this.error = error.message;
      return { success: false, error: error.message };
    }
  }

  // Activar/desactivar categoría
  async toggleCategoryStatus(id) {
    try {
      const category = this.getCategoryById(id);
      if (!category) {
        throw new Error("Categoría no encontrada");
      }

      return await this.updateCategory(id, {
        isActive: !category.isActive,
      });
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Crear categorías por defecto (para la primera vez)
  async createDefaultCategories() {
    const defaultCategories = [
      { name: "Entradas", description: "Aperitivos y entradas", order: 1 },
      {
        name: "Platos Principales",
        description: "Platos principales del menú",
        order: 2,
      },
      { name: "Postres", description: "Dulces y postres", order: 3 },
      { name: "Bebidas", description: "Bebidas frías y calientes", order: 4 },
      { name: "Ensaladas", description: "Ensaladas frescas", order: 5 },
    ];

    try {
      const results = [];
      for (const category of defaultCategories) {
        const result = await this.addCategory(category);
        results.push(result);
      }
      return results;
    } catch (error) {
      console.error("Error creating default categories:", error);
      throw error;
    }
  }

  // Getters para el estado
  get isLoading() {
    return this.loading;
  }

  get hasError() {
    return this.error !== null;
  }

  get errorMessage() {
    return this.error;
  }

  get allCategories() {
    return this.categories;
  }
}

// Crear instancia singleton
const categoryManager = new CategoryService();

export default categoryManager;
