// Menu.jsx
import React, { useEffect, useState } from "react";
import Header from "../components/common/Header";
import MenuContainer from "../components/menu/MenuContainer";
import { useMenu } from "../hooks/useMenu";
import { useNavigate } from "react-router-dom";

const Menu = () => {
  const { categories, loading, error, getProductsByCategory } = useMenu();
  const [activeCategory, setActiveCategory] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (categories.length > 0 && !activeCategory) {
      setActiveCategory(categories[0].id);
    }
  }, [categories, activeCategory]);

  const handleAdminClick = () => {
      navigate("/admin");
  };

  return (
    <div className="menu-page">
      <Header
        showAdminLink={true}
        onAdminClick={handleAdminClick}
        categories={categories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      <main className="main-content">
        <div className="container">
          <MenuContainer
            loading={loading}
            error={error}
            categories={categories}
            activeCategory={activeCategory}
            getProductsByCategory={getProductsByCategory}
          />
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <p>&copy; 2025 Prost Restaurant & Bar. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Menu;
