// src/hooks/useAuth.js
import { useContext } from "react";
import { AuthContext } from "../login/AuthProvider";

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context; // { user, loading }
};
