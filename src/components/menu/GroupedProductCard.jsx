// src/components/menu/GroupedProductCard.jsx
import React from 'react';
import './ProductCard.css'; // Reutilizás el mismo CSS

const GroupedProductCard = ({ group }) => {
  const { name, description, presentations } = group;

  const formatPrice = (price) =>
    new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0
    }).format(price);

  return (
    <div className="product-card">
      <div className="product-info">
        <h3 className="product-name">{name}</h3>
        {description && <p className="product-description">{description}</p>}

        <ul className="product-presentations">
          {presentations.map((item) => (
            <li key={item.id}>
              {item.presentation || 'Único'}: {formatPrice(item.price)}
              {!item.available && <span className="unavailable-badge">No disponible</span>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GroupedProductCard;
