// CategoryGrid.jsx
import React from "react";
import { Row, Col } from "react-bootstrap";
import ProductCard from "./ProductCard";

const CategoryGrid = ({ products }) => {
  // Agrupar productos por nombre y displayOrder
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
      displayOrder: prod.displayOrder, // necesario para el orden
    });
    return acc;
  }, {});

  // Convertir a array y ordenar variantes por precio
  const groupedArray = Object.values(grouped)
    .map((product) => {
      const sortedVariants = product.variants.sort((a, b) => a.price - b.price);
      return {
        ...product,
        variants: sortedVariants,
        displayOrder: sortedVariants[0]?.displayOrder ?? 999, // se usa para ordenar productos agrupados
      };
    })
    .sort((a, b) => a.displayOrder - b.displayOrder);

  return (
    <Row>
      {groupedArray.map((product, idx) => (
        <Col
          xs={12}
          md={6}
          lg={4}
          key={`${product.name}-${idx}`}
          className="mb-4"
        >
          <ProductCard product={product} />
        </Col>
      ))}
    </Row>
  );
};

export default CategoryGrid;
