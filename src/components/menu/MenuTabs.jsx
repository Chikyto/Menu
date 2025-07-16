// src/components/menu/MenuTabs.jsx
import React from "react";
import { Beer, Utensils, Martini, Coffee, Pizza } from 'lucide-react';
import "./MenuTabs.css"; // Asegúrate de tener un CSS para los estilos de las pestañas

const iconMap = {
  "Cervezas": <Beer size={20} />,
  "Comidas": <Utensils size={20} />,
  "Tragos": <Martini size={20} />,
  "Café": <Coffee size={20} />,
  "Pizzas": <Pizza size={20} />,
};

const MenuTabs = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <div className="menu-tabs-scroll">
      {categories.map((cat) => (
        <button
          key={cat.id}
          className={`tab-button ${cat.id === activeCategory ? "active" : ""}`}
          onClick={() => onCategoryChange(cat.id)}
        >
          <span className="tab-icon">{iconMap[cat.name] || "🍽️"}</span>
          <span className="tab-label">{cat.name}</span>
        </button>
      ))}
    </div>
  );
};

export default MenuTabs;
