// src/components/common/Header.jsx
import React from "react";
import { Nav } from "react-bootstrap";
import "./Header.css";

const Header = ({
  // showAdminLink = false,
  // onAdminClick,
  categories = [],
  activeCategory,
  setActiveCategory,
}) => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="brand">
            <h1 className="logo">🍺 PROST</h1>
            <p className="tagline">Restaurant & Bar</p>
          </div>

          {/* {showAdminLink && (
            <button className="admin-btn" onClick={onAdminClick}>
              Administración
            </button>
          )} */}
        </div>

        {Array.isArray(categories) && categories.length > 0 && (
          <Nav fill variant="tabs" className="mb-0 overflow-auto flex-nowrap category-nav">
            {categories.map((category) => (
              <Nav.Item key={category.id}>
                <Nav.Link
                  active={category.id === activeCategory}
                  onClick={() => setActiveCategory(category.id)}
                  className="text-nowrap"
                >
                  {category.name}
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
        )}
      </div>
    </header>
  );
};

export default Header;
