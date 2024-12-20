import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Logo from "../Images/new_logo.svg"
import '../App.css'

const Header = ({ setIsAuthenticated }) => {
    const [icon, setIcon] = useState(true)
    const navigate = useNavigate();

    const handleLogout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <>
            <nav className={`navbar navbar-expand-lg navbar-light pt-0 pb-0 ${icon ? 'light large bold' : 'dark small'}`}>
                <NavLink className="navbar-brand p-0" to="/"><img className='logo' src={Logo} width="80px" alt='Logo' style={{ filter: 'drop-shadow(5px 5px 2px lightgray' }} /></NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse d-flex" id="navbarSupportedContent">
                    <ul className="navbar-nav m-auto md-d-flex">
                        <li className="nav-item">
                            <NavLink className={`nav-link ${icon ? 'bold' : 'bg-white text-dark'}`} to="/home">View</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className={`nav-link ${icon ? 'bold' : 'bg-white text-dark'}`} to="/createinvoice">Create</NavLink>
                        </li>
                    </ul>
                    <ul className="navbar-nav">
                        <li className="nav-item" onClick={handleLogout}>
                            <button className={`nav-link btn btn-link ${icon ? 'bold' : 'bg-white text-dark'}`} >Logout</button>
                        </li>
                    </ul>

                </div>
            </nav>
        </>
    )
}

export default Header;
