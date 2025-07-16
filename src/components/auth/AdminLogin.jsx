// src/components/admin/AdminLogin.jsx
import React, { useState } from "react";
import { loginAdmin } from "../../services/authService";
import "./AdminLogin.css";
import { useNavigate } from "react-router-dom";

const AdminLogin = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await loginAdmin(email, password);
      if (onLoginSuccess) {
        onLoginSuccess();
      }
    } catch (error) {
      console.error("Error de login:", error);
      setError(getErrorMessage(error.code));
    } finally {
      setLoading(false);
    }
  };

  const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case "auth/invalid-email":
        return "Email inválido";
      case "auth/user-disabled":
        return "Usuario deshabilitado";
      case "auth/user-not-found":
        return "Usuario no encontrado";
      case "auth/wrong-password":
        return "Contraseña incorrecta";
      case "auth/invalid-credential":
        return "Credenciales inválidas";
      default:
        return "Error de autenticación. Intenta nuevamente.";
    }
  };

  return (
    <div className="admin-login">
      <div className="login-container">
        <div className="login-header">
          <h2>🔐 Administración</h2>
          <p>Acceso solo para administradores</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@prost.com"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              disabled={loading}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
          </button>
        </form>

        <div className="login-footer">
          <button className="back-btn" onClick={() => navigate("/")}>
            ← Volver al menú
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
