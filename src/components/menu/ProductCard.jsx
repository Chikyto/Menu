// src/components/menu/ProductCard.jsx
import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const formatPrice = (price) =>
    new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
    }).format(price);

  // Ordenar variantes por precio (ascendente)
  const sortedVariants = Array.isArray(product.variants)
  ? [...product.variants] : [];

  return (
    <div className="product-card">
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        {product.description && <p className="product-description">{product.description}</p>}

        <div className="variant-grid">
          {sortedVariants.map((variant) => (
            <div key={variant.id} className={`variant-box ${!variant.available ? 'unavailable' : ''}`}>
              <div className="variant-presentation">{variant.presentation}</div>
              <div className="variant-price">{formatPrice(variant.price)}</div>
              {!variant.available && (
                <div className="variant-status">No disponible</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
