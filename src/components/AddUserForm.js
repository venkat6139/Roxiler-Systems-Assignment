import React, { useState } from 'react';
import api from './services/api';
import './styles/forms.css';

function AddUserForm({ onUserAdded }) {
  const [formData, setFormData] = useState({
    name: '', email: '', address: '', password: '', role: 'user'
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await api.post('/admin/users', formData, config);
      alert('User added successfully');
      onUserAdded();
    } catch (err) {
      alert('Failed to add user');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h4>Add User</h4>
      <input type="text" name="name" placeholder="Name" required minLength={20} maxLength={60}
        onChange={handleChange} />
      <input type="email" name="email" placeholder="Email" required
        onChange={handleChange} />
      <input type="text" name="address" placeholder="Address" maxLength={400}
        onChange={handleChange} />
      <input type="password" name="password" placeholder="Password" required
        pattern="(?=.*[A-Z])(?=.*[@$!%*?&]).{8,16}" 
        onChange={handleChange} />
      <select name="role" onChange={handleChange}>
        <option value="user">Normal User</option>
        <option value="admin">Admin</option>
      </select>
      <button type="submit">Add User</button>
    </form>
  );
}

export default AddUserForm;
