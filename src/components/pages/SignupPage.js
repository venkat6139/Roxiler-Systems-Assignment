import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    name: Yup.string().min(20).max(60).required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    address: Yup.string().max(400).required('Address is required'),
    password: Yup.string()
      .min(8)
      .max(16)
      .matches(/[A-Z]/, 'Must contain an uppercase letter')
      .matches(/[^a-zA-Z0-9]/, 'Must contain a special character')
      .required('Password is required'),
  });

  const handleSubmit = async (values) => {
    try {
      await api.post('/auth/signup', values);
      alert('Signup successful!');
      navigate('/login');
    } catch (err) {
      alert('Signup failed!');
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <Formik
        initialValues={{ name: '', email: '', address: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div>
            <label>Name:</label>
            <Field type="text" name="name" />
            <ErrorMessage name="name" component="div" />
          </div>

          <div>
            <label>Email:</label>
            <Field type="email" name="email" />
            <ErrorMessage name="email" component="div" />
          </div>

          <div>
            <label>Address:</label>
            <Field type="text" name="address" />
            <ErrorMessage name="address" component="div" />
          </div>

          <div>
            <label>Password:</label>
            <Field type="password" name="password" />
            <ErrorMessage name="password" component="div" />
          </div>

          <button type="submit">Signup</button>
        </Form>
      </Formik>
    </div>
  );
};

export default SignupPage;
