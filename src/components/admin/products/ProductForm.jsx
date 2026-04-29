import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadProductImage } from "../../../services/storageService";
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
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, presentation, price, categoryId } = formData;

    if (!name || !presentation || !price || !categoryId) {
      alert("Por favor completa todos los campos obligatorios.");
      return;
    }

    let imageUrl = null;
    if (imageFile) {
      setUploading(true);
      try {
        imageUrl = await uploadProductImage(imageFile, name);
      } catch {
        alert("Error al subir la imagen. Revisá las reglas de Firebase Storage.");
        setUploading(false);
        return;
      }
      setUploading(false);
    }

    onSave({ ...formData, ...(imageUrl && { imageUrl }) });
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

        <div className="image-upload">
          <label className="image-upload-label">
            Imagen del producto (opcional)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="image-input"
          />
          {imagePreview && (
            <img src={imagePreview} alt="Vista previa" className="image-preview" />
          )}
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
          <button type="submit" className="save-btn" disabled={uploading}>
            {uploading ? "Subiendo imagen..." : "Guardar"}
          </button>
          <button type="button" onClick={() => navigate("/admin")} className="cancel-btn">Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
