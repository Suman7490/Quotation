import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
axios.defaults.withCredentials = true

const Login = ({setIsAuthenticated }) => {
    const [values, setValues] = useState({ email: '', password: '' })
    const [error, setError] = useState(null)

    const navigate = useNavigate()
   

    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post('http://localhost:8000/login', values, { withCredentials: true })
            .then(result => {
                if (result.data.LoginStatus) {
                    setIsAuthenticated(true); 
                } else {
                    setError(result.data.Error)
                    navigate('/')
                }
            })
            .catch(err => {
                setError('Invalid Credential.');
                console.error(err);
            });
    }

    return (
        <>
            <div className='d-flex justify-content-center align-items-center LoginPage' style={{ height: "100%" }}>
                <form className='p-3 w-25 rounded text-center LoginForm' onSubmit={handleSubmit}>
                    <span className='text-danger text-sm'>{error && error}</span>
                    <h2 className='pb-3 text-white text-xl font-bold'>Login Page</h2>

                    <div className='form-group'>
                        <input
                            type='email'
                            name='email'
                            placeholder='email'
                            className='form-control'
                            onChange={e => setValues({ ...values, email: e.target.value })} />
                    </div>
                    <div className='form-group'>
                        <input
                            type='password'
                            name='password'
                            placeholder='password'
                            className='form-control'
                            onChange={e => setValues({ ...values, password: e.target.value })} />
                    </div>
                    <div className='form-group d-flex justify-content-around'>
                        <button type='submit' className='btn btn-success w-100'>Login</button>
                    </div>  
                </form>
            </div>

        </>
    )
}

export default Login