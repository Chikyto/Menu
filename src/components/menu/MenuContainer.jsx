// MenuContainer.jsx
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import CategoryGrid from "./CategoryGrid";
import Loading from "../common/Loading";

const MenuContainer = ({
  loading,
  error,
  categories,
  activeCategory,
  getProductsByCategory
}) => {
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

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <CategoryGrid products={activeProducts} />
        </Col>
      </Row>
    </Container>
  );
};

export default MenuContainer;
