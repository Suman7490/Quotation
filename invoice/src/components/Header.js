import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {



    return (
        <div className='container'>
            <div className='row'>
                <div className='col-12'>
                    <ul className='d-flex list-unstyled'>
                        <li className='p-2'><Link to='/'>View</Link></li>
                        <li className='p-2'><Link to="/createinvoice">Create Invoice</Link></li>
                        <li className='p-2'><Link to="/register">Register</Link></li>
                        <li className='p-2'><Link to="/login">Login</Link></li>
                    </ul>
                </div>
            </div>
      
        </div>
    )
}


export default Header;
