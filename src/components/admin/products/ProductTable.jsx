// ProductTable.jsx
import React, { useRef, useState } from "react";
import { Table, Form, Button, Badge } from "react-bootstrap";
import { FaEdit, FaTrash, FaSave, FaTimes, FaImage } from "react-icons/fa";
import { uploadProductImage } from "../../../services/storageService";

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
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleKeyDown = (e) => {
    if (["Enter", "ArrowUp", "ArrowDown"].includes(e.key)) {
      e.preventDefault();
      onInlineSave();
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file || !editingProduct) return;
    setUploading(true);
    try {
      const url = await uploadProductImage(file, editingProduct.name);
      onChangeField("imageUrl", url);
    } catch {
      alert("Error al subir la imagen. Revisá las reglas de Firebase Storage.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="table-responsive">
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Producto</th>
            <th>Descripción</th>
            <th>Categoría</th>
            <th>Presentación</th>
            <th>Precio</th>
            <th>Orden</th>
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
                <td className="text-center align-middle" style={{ minWidth: 80 }}>
                  {isEditing ? (
                    <div className="d-flex flex-column align-items-center gap-1">
                      {editingProduct.imageUrl && (
                        <img
                          src={editingProduct.imageUrl}
                          alt=""
                          style={{ width: 48, height: 48, objectFit: "cover", borderRadius: 6 }}
                        />
                      )}
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={handleImageChange}
                      />
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploading}
                        title="Cambiar imagen"
                      >
                        {uploading ? "..." : <FaImage />}
                      </Button>
                    </div>
                  ) : (
                    product.imageUrl
                      ? <img
                          src={product.imageUrl}
                          alt=""
                          style={{ width: 48, height: 48, objectFit: "cover", borderRadius: 6 }}
                        />
                      : <span className="text-muted">—</span>
                  )}
                </td>

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
                      onChange={(e) =>
                        onChangeField("description", e.target.value)
                      }
                    />
                  ) : (
                    product.description
                  )}
                </td>

                <td>
                  {isEditing ? (
                    <Form.Select
                      value={editingProduct.categoryId || ""}
                      onChange={(e) =>
                        onChangeField("categoryId", e.target.value)
                      }
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
                      onChange={(e) =>
                        onChangeField("presentation", e.target.value)
                      }
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
                    <Form.Control
                      type="number"
                      value={editingProduct.displayOrder || 0}
                      onChange={(e) =>
                        onChangeField("displayOrder", parseInt(e.target.value))
                      }
                    />
                  ) : (
                    product.displayOrder ?? "-"
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
                        disabled={uploading}
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
