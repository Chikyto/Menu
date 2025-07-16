// src/components/admin/ProtectedRoute.jsx
import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import AdminLogin from './AdminLogin';
import Loading from '../common/Loading';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loading message="Verificando autenticación..." />;
  }

  if (!user) {
    return <AdminLogin />;
  }

  return children;
};

export default ProtectedRoute;