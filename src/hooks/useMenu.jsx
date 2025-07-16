// src/hooks/useMenu.js
import { useState, useEffect } from 'react';
import { 
  subscribeToCategoriesChanges, 
  subscribeToProductsChanges 
} from '../services/menuService';

export const useMenu = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let unsubscribeCategories;
    let unsubscribeProducts;

    const setupSubscriptions = async () => {
      try {
        // Suscribirse a cambios en categorías
        unsubscribeCategories = subscribeToCategoriesChanges((newCategories) => {
          setCategories(newCategories);
        });

        // Suscribirse a cambios en productos
        unsubscribeProducts = subscribeToProductsChanges((newProducts) => {
          setProducts(newProducts);
          setLoading(false);
        });

      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    setupSubscriptions();

    // Cleanup
    return () => {
      if (unsubscribeCategories) unsubscribeCategories();
      if (unsubscribeProducts) unsubscribeProducts();
    };
  }, []);

  const getProductsByCategory = (categoryId) => {
    return products.filter(product => 
      product.categoryId === categoryId && product.available
    );
  };

  return {
    categories,
    products,
    loading,
    error,
    getProductsByCategory
  };
};