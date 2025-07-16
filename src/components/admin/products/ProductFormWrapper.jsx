import React, { useState, useEffect } from "react";
import ProductForm from "./ProductForm";
import CategoryForm from "../categories/CategoryForm";
import CategoryService from "../../../services/categoryService";
import ProductService from "../../../services/productService";

const ProductFormWrapper = () => {
  const [categories, setCategories] = useState([]);
  const [showCategoryForm, setShowCategoryForm] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const all = await CategoryService.getCategories();
    const active = all.filter((c) => c.isActive);
    setCategories(active);
  };

const handleSaveProduct = async (formData) => {
  const result = await ProductService.addProduct(formData);
  if (result.success) {
    console.log("Producto guardado con ID:", result.id);
  } else {
    console.error("Error al guardar:", result.error);
  }
};

  const handleAddCategoryClick = () => {
    setShowCategoryForm(true);
  };

  const handleCategorySaved = async () => {
    setShowCategoryForm(false);
    await loadCategories();
  };

  const handleCancelCategory = () => {
    setShowCategoryForm(false);
  };

  return (
    <div>
      <ProductForm
        categories={categories}
        onSave={handleSaveProduct}
        onAddCategory={handleAddCategoryClick}
      />

      {showCategoryForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <CategoryForm 
              onSuccess={handleCategorySaved} 
              onCancel={handleCancelCategory} 
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductFormWrapper;
