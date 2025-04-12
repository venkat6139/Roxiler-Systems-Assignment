import React from 'react';
import ProtectedRoute from '../ProtectedRoute';
import AdminDashboard from '../AdminDashboard';

function AdminDashboardPage() {
  return (
    <ProtectedRoute>
      <AdminDashboard />
    </ProtectedRoute>
  );
}

export default AdminDashboardPage;
