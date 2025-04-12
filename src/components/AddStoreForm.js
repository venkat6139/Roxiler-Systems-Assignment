import React, { useState } from 'react';
import api from '../services/api';

function AddStoreForm({ onStoreAdded }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: ''
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await api.post('/admin/stores', formData, config);
      alert('Store added successfully');
      onStoreAdded();
    } catch (err) {
      alert('Failed to add store');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4>Add Store</h4>
      <input type="text" name="name" placeholder="Store Name" required onChange={handleChange} />
      <input type="email" name="email" placeholder="Store Email" required onChange={handleChange} />
      <input type="text" name="address" placeholder="Address" required onChange={handleChange} />
      <button type="submit">Add Store</button>
    </form>
  );
}

export default AddStoreForm;
