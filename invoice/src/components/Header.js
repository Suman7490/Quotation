import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from "./KRW.png"
import { Icon } from "semantic-ui-react"
import '../App.css'
const Header = () => {
    const [icon, setIcon] = useState(true)


    const changeIcon = () => {
        if (icon == true) {
            setIcon(false)
        } else (
            setIcon(true)
        )

    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light">
                <NavLink className="navbar-brand" to="/"><img src={Logo} width="100px" alt='Logo' /></NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav m-auto">
                        <li className="nav-item active">
                            <NavLink className="nav-link" exact to="/" activeClassName="active-nav">View</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link underline" to="/createinvoice" activeClassName="active-nav">Create Invoice</NavLink>
                        </li>
                        {/* <li className="nav-item">
                            <NavLink className="nav-link" to="/register" activeClassName="active-nav">Registration</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/login" activeClassName="active-nav">Login</NavLink>
                        </li> */}
                    </ul>

              

                    <button className='btn' onClick={changeIcon}>
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
