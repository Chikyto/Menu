// MenuContainer.jsx (versión con Bootstrap)
import React, { useState, useEffect } from "react";
import { useMenu } from "../../hooks/useMenu";
import Loading from "../common/Loading";
import { Container, Row, Col, Nav } from "react-bootstrap";
import CategoryGrid from "./CategoryGrid";

const MenuContainer = () => {
  const { categories, loading, error, getProductsByCategory } = useMenu();
  const [activeCategory, setActiveCategory] = useState("");

  useEffect(() => {
    if (categories.length > 0 && !activeCategory) {
      setActiveCategory(categories[0].id);
    }
  }, [categories, activeCategory]);

  if (loading) return <Loading message="Cargando menú..." />;

  if (error) {
    return (
      <Container className="text-center mt-5">
        <h3>Error al cargar el menú</h3>
        <p>{error}</p>
        <button className="btn btn-outline-danger" onClick={() => window.location.reload()}>
          Reintentar
        </button>
      </Container>
    );
  }

  if (categories.length === 0) {
    return (
      <Container className="text-center mt-5">
        <h3>Menú no disponible</h3>
        <p>El menú se está actualizando. Vuelve pronto.</p>
      </Container>
    );
  }

  const activeProducts = getProductsByCategory(activeCategory);
  const activeCategoryName = categories.find(cat => cat.id === activeCategory)?.name || "";

  return (
    <Container className="mt-4">
      <Nav fill variant="tabs" className="mb-4 overflow-auto flex-nowrap">
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

      <Row>
        <Col>
          <h2 className="text-center mb-4">{activeCategoryName}</h2>
          <CategoryGrid products={activeProducts} />
        </Col>
      </Row>
    </Container>
  );
};

export default MenuContainer;
