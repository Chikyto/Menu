// src/components/menu/MenuTabs.jsx
import React from "react";
import categoryIcons from "../../utils/categoryIcons";
import "./MenuTabs.css";

const MenuTabs = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <div className="menu-tabs-scroll">
      {categories.map((cat) => (
        <button
          key={cat.id}
          className={`tab-button ${cat.id === activeCategory ? "active" : ""}`}
          onClick={() => onCategoryChange(cat.id)}
        >
          <span className="tab-icon">{categoryIcons[cat.name] || "🍽️"}</span>
          <span className="tab-label">{cat.name}</span>
        </button>
      ))}
    </div>
  );
};

export default MenuTabs;
