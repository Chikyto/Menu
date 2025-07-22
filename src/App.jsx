// src/App.jsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Menu from "./pages/Menu";
import AdminDashboard from "./components/admin/dashboard/AdminDashboard";
import ProductFormWrapper from "./components/admin/products/ProductFormWrapper";
import ProtectedRoute from "./components/auth/ProtectedRoute"; // TU componente actual
import "./styles/admin/globals.css";
import { AuthProvider } from "./login/AuthProvider";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  <ToastContainer position="top-center" />
  return (
    <Router>
      <AuthProvider>
      <div className="app">
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/menu" element={<Navigate to="/" replace />} />

          {/* Rutas protegidas con tu componente */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/producto/nuevo"
            element={
              <ProtectedRoute>
                <ProductFormWrapper />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
