// CategoryGrid.jsx
import React from "react";
import { Row, Col } from "react-bootstrap";
import ProductCard from "./ProductCard";

const CategoryGrid = ({ products }) => {
  // Agrupar productos por nombre
  const grouped = products.reduce((acc, prod) => {
    const key = prod.name;
    if (!acc[key]) {
      acc[key] = {
        name: prod.name,
        description: prod.description,
        variants: [],
      };
    }
    acc[key].variants.push({
      id: prod.id,
      presentation: prod.presentation,
      price: prod.price,
      available: prod.available,
    });
    return acc;
  }, {});

  // Convertir a array y ordenar variantes por precio
  const groupedArray = Object.values(grouped).map((product) => ({
    ...product,
    variants: product.variants.sort((a, b) => a.price - b.price),
  }));

  return (
    <Row>
      {groupedArray.map((product, idx) => (
        <Col xs={12} md={6} lg={4} key={`${product.name}-${idx}`} className="mb-4">
          <ProductCard product={product} />
        </Col>
      ))}
    </Row>
  );
};

export default CategoryGrid;
