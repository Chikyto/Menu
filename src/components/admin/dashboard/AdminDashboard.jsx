// AdminDashboard.jsx (con Bootstrap)
import React, { useState, useEffect } from "react";
import { useMenu } from "../../../hooks/useMenu";
import { logoutAdmin } from "../../../services/authService";
import { deleteProduct, updateProduct } from "../../../services/menuService";
import { useNavigate, useLocation } from "react-router-dom";
import ProductTable from "../../admin/products/ProductTable";
import Filters from "./Filters";
import Loading from "../../common/Loading";
import { useAutoLogout } from "../../../hooks/useAutoLogout";
import { useAdminRouteGuard } from "../../../hooks/useAdminRouteGuard";
import { Container, Row, Col, Button, Navbar, Nav } from "react-bootstrap";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const { categories, products, loading } = useMenu();
  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPresentation, setSelectedPresentation] = useState("all");

  const navigate = useNavigate();
  const location = useLocation();
  const presentations = [...new Set(products.map((p) => p.presentation))];

  useAdminRouteGuard();
  useAutoLogout(10);

  useEffect(() => {
    const isInAdminPanel = location.pathname.startsWith("/admin");
    if (!isInAdminPanel) {
      logoutAdmin()
        .then(() => {
          alert(
            "⚠️ Has salido del panel de administración. Sesión finalizada."
          );
        })
        .catch((error) => {
          console.error("Error cerrando sesión al salir del admin:", error);
        });
    }
  }, [location]);

  const handleNewProduct = () => navigate("/admin/producto/nuevo");
  
  const handleLogout = async () => {
    try {
      await logoutAdmin();
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const handleEditProduct = (product) => setEditingProduct(product);

  const handleInlineSave = async () => {
    try {
      await updateProduct(editingProduct.id, editingProduct);
      setEditingProduct(null);
      toast.success("Producto actualizado correctamente");
    } catch (err) {
      console.error("Error al guardar cambios:", err);
      alert("Error al guardar los cambios");
    }
  };

  const handleInlineChange = (field, value) => {
    setEditingProduct((prev) => {
      const updated = {
        ...prev,
        [field]:
          field === "price" || field === "displayOrder"
            ? parseFloat(value)
            : value,
      };

      // Si cambia displayOrder, actualizar todos los productos con el mismo nombre
      if (field === "displayOrder") {
        const sameNameProducts = products.filter(
          (p) => p.name.toLowerCase() === prev.name.toLowerCase()
        );
        sameNameProducts.forEach((p) => {
          updateProduct(p.id, { ...p, displayOrder: updated.displayOrder });
        });
        // alert(
        //   `Orden actualizado para todas las presentaciones de "${prev.name}"`
        // );
      }
      return updated;
    });
  };

  const handleDeleteProduct = async (productId, productName) => {
    if (window.confirm(`¿Eliminar "${productName}"?`)) {
      try {
        await deleteProduct(productId);
      } catch (error) {
        console.error("Error eliminando producto:", error);
        alert("Error al eliminar el producto");
      }
    }
  };

  const formatPrice = (price) =>
    new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
    }).format(price);

  const filteredProducts = products.filter((p) => {
    const matchesCategory =
      selectedCategory === "all" || p.categoryId === selectedCategory;
    const matchesPresentation =
      selectedPresentation === "all" || p.presentation === selectedPresentation;
    return matchesCategory && matchesPresentation;
  });

  if (loading) return <Loading message="Cargando panel de administración..." />;

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand>🍺 Prost - Administración</Navbar.Brand>
          <Nav className="ms-auto">
            <Button variant="outline-light" onClick={handleLogout}>
              Cerrar sesión
            </Button>
          </Nav>
        </Container>
      </Navbar>

      <Container>
        <Row className="mb-3">
          <Col md={4} sm={6} xs={12} className="mb-2">
            <Filters
              categories={categories}
              presentations={presentations}
              selectedCategory={selectedCategory}
              selectedPresentation={selectedPresentation}
              onCategoryChange={setSelectedCategory}
              onPresentationChange={setSelectedPresentation}
            />
          </Col>
          <Col md={8} className="text-end">
            <Button variant="primary" onClick={handleNewProduct}>
              + Agregar producto
            </Button>
          </Col>
        </Row>

        <ProductTable
          products={filteredProducts}
          categories={categories}
          editingProduct={editingProduct}
          onEdit={handleEditProduct}
          onDelete={handleDeleteProduct}
          onChangeField={handleInlineChange}
          onInlineSave={handleInlineSave}
          onCancel={() => setEditingProduct(null)}
          formatPrice={formatPrice}
        />

        {filteredProducts.length === 0 && (
          <div className="text-center py-4">
            <p>No hay productos en esta categoría</p>
          </div>
        )}
      </Container>
    </>
  );
};

export default AdminDashboard;
