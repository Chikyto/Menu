import React from "react";
import "./Header.css";

const categoryIcons = {
  "Entradas": "🍟",
  "Individuales": "🥜",
  "Cervezas": "🍺",
  "Bebidas sin alcohol": "🥤",
  "Pizzas": "🍕",
  "Sandwiches": "🍔",
  "Tablas": "🧀",
  "Platos principales": "🍛",
  "Sin TACC": "🚫🌾",
  "Ensaladas": "🥗",
  "Postres": "🍰",
  "Vinos": "🍷",
  "Tragos": "🍸",
  "Espirituosos": "🥃",
};

const Header = ({
  categories = [],
  activeCategory,
  setActiveCategory
}) => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="brand">
            <h1 className="logo">🍺 PROST</h1>
            <p className="tagline">Restaurant & Bar</p>
          </div>
        </div>

        {Array.isArray(categories) && categories.length > 0 && (
          <div className="category-nav-icons">
            {categories.map((category) => (
              <div
                key={category.id}
                className={`category-icon-item ${
                  category.id === activeCategory ? "active" : ""
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                <div className="category-icon">
                  {categoryIcons[category.name] || "🍽️"}
                </div>
                <div className="category-label">{category.name}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
