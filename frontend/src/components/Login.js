import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Login() {
    const [values, setValues] = useState({ email: '', password: '' })
    const [error, setError] = useState(null)

    const navigate = useNavigate()
    axios.defaults.withCredentials = true

    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post('http://localhost:8081/auth/adminlogin', values)
            .then(result => {
                if (result.data.LoginStatus) {
                    navigate('/dashboard')
                } else {
                    setError(result.data.Error)
                }
            })
    }

    return (
        <>
            <div className='d-flex justify-content-center align-items-center LoginPage' style={{height: "100%"}}>
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
                    <div className=''>
                        <input type='checkbox' />
                        <label className='text-sm pt-2 pl-2'>You are agree with the terms & conditions</label>
                    </div>
                </form>
            </div>
        
        </>
    )
}

export default Login