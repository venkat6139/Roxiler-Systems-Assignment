import React, { useEffect, useState } from 'react';
import api from './services/api';
import AddUserForm from './AddUserForm';
import UserTable from './UserTable';
import './styles/dashboard.css';

function AdminDashboard() {
  const [summary, setSummary] = useState({ totalUsers: 0, totalStores: 0, totalRatings: 0 });
  const [users, setUsers] = useState([]);

  const fetchDashboard = async () => {
    const token = localStorage.getItem('token');
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const response = await api.get('/admin/dashboard', config);
    setSummary(response.data.summary);
    setUsers(response.data.users);
  };

  useEffect(() => { fetchDashboard(); }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-heading">Admin Dashboard</h1>

      <div className="dashboard-summary">
        <div className="summary-card users">
          <h4>Users</h4>
          <p>{summary.totalUsers}</p>
        </div>
        <div className="summary-card stores">
          <h4>Stores</h4>
          <p>{summary.totalStores}</p>
        </div>
        <div className="summary-card ratings">
          <h4>Ratings</h4>
          <p>{summary.totalRatings}</p>
        </div>
      </div>

      <button onClick={handleLogout} className="logout-btn">Logout</button>

      <AddUserForm onUserAdded={fetchDashboard} />

      <h3>Users</h3>
      <UserTable users={users} />
    </div>
  );
}

export default AdminDashboard;
