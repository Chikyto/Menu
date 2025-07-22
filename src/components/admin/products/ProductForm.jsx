import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProductForm.css";

const ProductForm = ({ categories, onSave, onAddCategory }) => {
  const [formData, setFormData] = useState({
    name: "",
    presentation: "",
    description: "",
    price: "",
    displayOrder: "",
    available: true,
    categoryId: "",
  });

  const navigate = useNavigate();

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, presentation, price, categoryId } = formData;

    if (!name || !presentation || !price || !categoryId) {
      alert("Por favor completa todos los campos obligatorios.");
      return;
    }

    onSave(formData); // El manejador guardará esto como un producto
    navigate("/admin");
  };

  return (
    <div className="product-form-wrapper">
      <form onSubmit={handleSubmit} className="product-form">
        <h2>Agregar presentación de producto</h2>

        <input
          type="text"
          placeholder="Nombre del producto (ej. Gran Lady)"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Presentación (ej. Pinta, Pitcher)"
          value={formData.presentation}
          onChange={(e) => handleChange("presentation", e.target.value)}
          required
        />

        <textarea
          placeholder="Descripción del producto"
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
        />

        <input
          type="number"
          placeholder="Precio"
          value={formData.price}
          onChange={(e) => handleChange("price", e.target.value)}
          required
        />

        <textarea
          placeholder="Orden de visualización (opcional)"
          value={formData.displayOrder}
          onChange={(e) => handleChange("displayOrder", e.target.value)}
        />

        <div className="category-select">
          <select
            value={formData.categoryId}
            onChange={(e) => handleChange("categoryId", e.target.value)}
            required
          >
            <option value="" disabled>Seleccionar categoría</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
          <button
            type="button"
            onClick={onAddCategory}
            className="add-category-btn"
          >
            + Nueva categoría
          </button>
        </div>

        <label className="available-checkbox">
          <input
            type="checkbox"
            checked={formData.available}
            onChange={(e) => handleChange("available", e.target.checked)}
          />
          Disponible
        </label>

        <div className="form-actions">
          <button type="submit" className="save-btn">Guardar</button>
          <button type="button" onClick={() => navigate("/admin")} className="cancel-btn">Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
