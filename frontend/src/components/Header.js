import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from "./new_logo.svg"
import { Icon } from "semantic-ui-react"
import '../App.css'
const Header = () => {
    const [icon, setIcon] = useState(true)

    const changeIcon = () => {
        if (icon == true) {
             setIcon(false) 
            }
        else (setIcon(true))
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
                            <NavLink className={`nav-link ${icon ? 'bold' : 'bg-white text-dark'}`} exact to="/">View</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className={`nav-link ${icon ? 'bold' : 'bg-white text-dark'}`} to="/createinvoice">Create</NavLink>
                        </li>
                        {/* <li className="nav-item">
                            <NavLink className="nav-link" to="/register" activeClassName="active-nav">Registration</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/login" activeClassName="active-nav">Login</NavLink>
                        </li> */}
                    </ul>
                    <button className={`btn icon ${icon ? 'bold' : 'bg-white'}`} onClick={changeIcon}>
                        {icon ?
                            (<Icon className='moon' size='large' />)
                            :
                            (<Icon className='sun' size='large' />)}
                    </button>
                </div>
            </nav>


        </>
    )
}


export default Header;
