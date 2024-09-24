import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    axios.post('http://localhost:8081/login', formData)
      .then(response => {
        alert('Login successful');
        // You can store the JWT token in localStorage or state for authenticated requests
        localStorage.setItem('token', response.data.token);
      })
      .catch(error => {
        console.error('Error logging in:', error);
        alert('Invalid email or password');
      });
  };

  return (
    <>
      <div className='container'>
        <div className='row'>
          <div className='col-md-3'></div>
          <div className='col-md-6 border border-info rounded p-5'>
            <h1 className='text-center'>Login Form</h1>
            <form onSubmit={handleSubmit}>
              <div className='form-group'>
                <label htmlFor='email'>Email:</label>
                <input type="email" name="email" className='form-control' value={formData.email} onChange={handleChange} />
                {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
              </div>
              <div className='form-group'>
                <label htmlFor='password'>Password:</label>
                <input type="password" name="password" className='form-control' value={formData.password} onChange={handleChange} />
                {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
              </div>
              <div className='form-group text-center'>
              <button type="submit" className='btn btn-info btn-large'>Login</button>
              </div>
            </form>
          </div>
          <div className='col-md-3'></div>
        </div>
      </div>

    </>

  );
};

export default Login;
