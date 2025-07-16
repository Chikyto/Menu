// src/context/AuthProvider.jsx
import React, { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { auth } from "../services/firebase";
import { logoutAdmin } from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Mantiene el usuario actualizado
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser || null);
    });
    return () => unsubscribe();
  }, []);

  // Detecta si se salió del /admin
  useEffect(() => {
    const isInAdmin = location.pathname.startsWith("/admin");
    if (!isInAdmin && user) {
      logoutAdmin()
        .then(() => {
          alert("⚠️ Has salido del panel de administración. Sesión finalizada.");
          navigate("/"); // Redirige al menú
        })
        .catch((err) => console.error("Error al cerrar sesión:", err));
    }
  }, [location.pathname]);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};
