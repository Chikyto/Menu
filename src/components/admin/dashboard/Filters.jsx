// src/components/admin/Filters.jsx
import React from "react";
import Select from "react-select";

const Filters = ({
  categories,
  presentations,
  selectedCategory,
  selectedPresentation,
  onCategoryChange,
  onPresentationChange,
}) => {
  const categoryOptions = [
    { value: "all", label: "Todas las categorías" },
    ...categories.map((cat) => ({
      value: cat.id,
      label: cat.name,
    })),
  ];

  const presentationOptions = [
    { value: "all", label: "Todas las presentaciones" },
    ...presentations.map((pres) => ({
      value: pres,
      label: pres,
    })),
  ];

  return (
    <div className="filters-container">
      <Select
        options={categoryOptions}
        value={categoryOptions.find((opt) => opt.value === selectedCategory)}
        onChange={(option) => onCategoryChange(option.value)}
        className="filter-select"
        placeholder="Filtrar por categoría"
      />
      <Select
        options={presentationOptions}
        value={presentationOptions.find(
          (opt) => opt.value === selectedPresentation
        )}
        onChange={(option) => onPresentationChange(option.value)}
        className="filter-select"
        placeholder="Filtrar por presentación"
      />
    </div>
  );
};

export default Filters;
