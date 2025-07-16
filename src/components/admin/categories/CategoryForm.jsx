import { useState } from "react";
import categoryService from "../../../services/categoryService";
import "../products/ProductForm.css"; // Usá el mismo CSS si ya está diseñado

const CategoryForm = ({ onSuccess, onCancel }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await categoryService.addCategory({
        name,
        description,
        isActive,
      });
      if (result.success) {
        onSuccess && onSuccess(result.category);
        setName("");
        setDescription("");
        setIsActive(true);
      } else {
        setError(result.error);
      }
    } catch {
      setError("Error al guardar la categoría");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="product-form-wrapper"> {/* Reutilizamos wrapper */}
      <form onSubmit={handleSubmit} className="product-form">
        <h2>Agregar nueva categoría</h2>

        {error && <p className="error">{error}</p>}

        <div className="form-group">
          <label>Nombre de la categoría</label>
          <input
            type="text"
            placeholder="Ej: Postres"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Descripción</label>
          <textarea
            placeholder="Describe esta categoría..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <label className="available-checkbox">
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
          />
          Activa
        </label>

        <div className="form-actions">
          <button type="submit" className="save-btn" disabled={loading}>
            {loading ? "Guardando..." : "Guardar"}
          </button>
          <button type="button" onClick={onCancel} className="cancel-btn">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
