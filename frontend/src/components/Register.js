import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Register = () => {
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        gender: '',
        role: '',
        checkbox: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value, });
    }


    const Validations = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.password) newErrors.password = 'Password is required';
        if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
        if (!formData.gender) newErrors.gender = 'Gender is required';
        if (!formData.role) newErrors.role = 'Role is required';
        if (!formData.checkbox) newErrors.checkbox = 'You must agree to the terms and conditions';
        return newErrors;
    }




    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = Validations();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        try {
            const emailExists = await axios.post(`http://localhost:8081/check-email`, { email: formData.email });
            if (emailExists.data.exists) {
                setErrors({ ...validationErrors, email: 'Email already exists' });
                return;
            }
            await axios.post('http://localhost:8081/register', formData);
            alert('Registration successful');
            navigate('/');
        } catch (error) {
            console.error('Error during registration:', error);
        }


    };




    return (
        <>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-2'></div>

                    <div className='col-md-8 border border-warning rounded p-5'>
                        <h1 className='text-center'>Register Form</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor='name'>Name</label>
                                <input type="text" name="name" className='form-control' value={formData.name} onChange={handleChange} />
                                {errors.name && <span className='text-danger'> {errors.name}</span>}
                            </div>

                            <div className="form-group">
                                <label htmlFor='email'>Email</label>
                                <input type="email" name="email" className='form-control' value={formData.email} onChange={handleChange} />
                                {errors.email && <span className='text-danger'> {errors.email}</span>}
                            </div>

                            <div className="form-group">
                                <label htmlFor='gender'>Gender</label>
                                <select className='form-control' name='gender' value={formData.gender} onChange={handleChange} >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                                {errors.gender && <span className='text-danger'> {errors.gender}</span>}
                            </div>

                            <div className="form-group">
                                <label htmlFor='role'>Role</label>
                                <select className='form-control' name="role" value={formData.role} onChange={handleChange}>
                                    <option value="">Select Role</option>
                                    <option value="Admin">Admin</option>
                                    <option value="User">User</option>
                                </select>
                                {errors.role && <span className='text-danger'> {errors.role}</span>}
                            </div>

                            <div className="form-group">
                                <label htmlFor='Password'>Password</label>
                                <input type="password" name="password" className='form-control' value={formData.password} onChange={handleChange} />
                                {errors.password && <span className='text-danger'> {errors.password}</span>}
                            </div>

                            <div className="form-group">
                                <input type="checkbox" name="checkbox" className='form-check-input' checked={formData.terms} onChange={handleChange} />
                                <label htmlFor='Checkbox' class="form-check-label" for="exampleCheck1">Check me out</label>
                                {errors.checkbox && <span className='text-danger'> {errors.checkbox}</span>}
                            </div>

                            <button className='btn btn-large btn-warning' type='submit'>Register</button>
                        </form>
                    </div>

                    <div className='col-md-2'></div>
                </div>
            </div >
        </>
    )
}

export default Register
