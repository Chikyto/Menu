// src/pages/Admin.jsx
import React from 'react';
import ProtectedRoute from '../components/common/ProtectedRoute';
import AdminDashboard from '../components/admin/dashboard/AdminDashboard';

const Admin = () => {
  return (
    <ProtectedRoute>
      <AdminDashboard />
    </ProtectedRoute>
  );
};

export default Admin;