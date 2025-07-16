// ProductTable.jsx
import React from "react";
import { Table, Form, Button, Badge, InputGroup } from "react-bootstrap";
import { FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";

const ProductTable = ({
  products,
  categories,
  editingProduct,
  onEdit,
  onDelete,
  onChangeField,
  onInlineSave,
  onCancel,
  formatPrice,
}) => {
  const handleKeyDown = (e) => {
    if (["Enter", "ArrowUp", "ArrowDown"].includes(e.key)) {
      e.preventDefault();
      onInlineSave();
    }
  };

  return (
    <div className="table-responsive">
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Descripción</th>
            <th>Categoría</th>
            <th>Presentación</th>
            <th>Precio</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            const isEditing = editingProduct?.id === product.id;
            const category =
              categories.find((c) => c.id === product.categoryId)?.name || "";

            return (
              <tr key={product.id}>
                <td>
                  {isEditing ? (
                    <Form.Control
                      type="text"
                      value={editingProduct.name || ""}
                      onChange={(e) => onChangeField("name", e.target.value)}
                    />
                  ) : (
                    <strong>{product.name}</strong>
                  )}
                </td>

                <td>
                  {isEditing ? (
                    <Form.Control
                      type="text"
                      value={editingProduct.description || ""}
                      onChange={(e) => onChangeField("description", e.target.value)}
                    />
                  ) : (
                    product.description
                  )}
                </td>

                <td>
                  {isEditing ? (
                    <Form.Select
                      value={editingProduct.categoryId || ""}
                      onChange={(e) => onChangeField("categoryId", e.target.value)}
                    >
                      <option value="">Seleccionar</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </Form.Select>
                  ) : (
                    <Badge bg="info">{category}</Badge>
                  )}
                </td>

                <td>
                  {isEditing ? (
                    <Form.Control
                      type="text"
                      value={editingProduct.presentation || ""}
                      onChange={(e) => onChangeField("presentation", e.target.value)}
                    />
                  ) : (
                    product.presentation
                  )}
                </td>

                <td>
                  {isEditing ? (
                    <Form.Control
                      type="number"
                      value={editingProduct.price}
                      onChange={(e) => onChangeField("price", e.target.value)}
                      onKeyDown={handleKeyDown}
                      onBlur={onInlineSave}
                    />
                  ) : (
                    formatPrice(product.price)
                  )}
                </td>

                <td>
                  {isEditing ? (
                    <Form.Select
                      value={editingProduct.available ? "true" : "false"}
                      onChange={(e) =>
                        onChangeField("available", e.target.value === "true")
                      }
                    >
                      <option value="true">Disponible</option>
                      <option value="false">No disponible</option>
                    </Form.Select>
                  ) : (
                    <Badge bg={product.available ? "success" : "secondary"}>
                      {product.available ? "Disponible" : "No disponible"}
                    </Badge>
                  )}
                </td>

                <td className="text-center">
                  {isEditing ? (
                    <>
                      <Button
                        variant="success"
                        size="sm"
                        className="me-2"
                        onClick={onInlineSave}
                      >
                        <FaSave />
                      </Button>
                      <Button variant="secondary" size="sm" onClick={onCancel}>
                        <FaTimes />
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="me-2"
                        onClick={() => onEdit(product)}
                      >
                        <FaEdit />
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => onDelete(product.id, product.name)}
                      >
                        <FaTrash />
                      </Button>
                    </>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default ProductTable;
