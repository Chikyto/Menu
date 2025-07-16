// src/pages/ProductFormPage.jsx
import React from "react";
import { useMenu } from "../hooks/useMenu";
import ProductForm from "../components/admin/products/ProductForm";
import Loading from "../components/common/Loading";

const ProductFormPage = () => {
  const { categories, loading } = useMenu();

  if (loading) return <Loading message="Cargando formulario..." />;

  return <ProductForm categories={categories} />;
};

export default ProductFormPage;
