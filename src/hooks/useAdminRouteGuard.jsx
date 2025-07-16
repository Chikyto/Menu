// src/hooks/useAdminRouteGuard.js
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { logoutAdmin } from "../services/authService";

export const useAdminRouteGuard = () => {
  const location = useLocation();

  useEffect(() => {
    const isAdminPath = location.pathname.startsWith("/admin");

    if (!isAdminPath) {
      logoutAdmin()
        .then(() => {
          console.log("🚪 Sesión cerrada al salir del admin");
          alert("⚠️ Has salido del panel de administración. Sesión finalizada.");
        })
        .catch((err) => console.error("Error al cerrar sesión:", err));
    }
  }, [location.pathname]);
};
