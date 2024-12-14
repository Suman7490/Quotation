import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Logo from "../Images/new_logo.svg"
import axios from 'axios';
import '../App.css'



const Header = () => {
    const [icon, setIcon] = useState(true)
    const navigate = useNavigate();

    const handleLogout = () => {
        axios.get('http://localhost:8081/auth/logout')
          .then(result => {
            if (result.data.Status) {
              navigate('/')
            }
          })
      }

    return (
        <>
            <nav className={`navbar navbar-expand-lg navbar-light pt-0 pb-0 ${icon ? 'light large bold' : 'dark small'}`}>
                <NavLink className="navbar-brand p-0" to="/"><img src={Logo} width="80px" alt='Logo' /></NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav m-auto">
                        <li className="nav-item">
                            <NavLink className={`nav-link ${icon ? 'bold' : 'bg-white text-dark'}`}  to="/home">View</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className={`nav-link ${icon ? 'bold' : 'bg-white text-dark'}`} to="/createinvoice">Create</NavLink>
                        </li>
                    </ul>
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item" onClick={handleLogout}>
                            <NavLink className={`nav-link ${icon ? 'bold' : 'bg-white text-dark'}`} exact="true" to="/">Logout</NavLink>
                        </li>
                    </ul>
                  
                </div>
            </nav>
        </>
    )
}



export default Header;
