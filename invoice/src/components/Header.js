import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from "./KRW.png"
import { Icon } from "semantic-ui-react"
const Header = () => {
    const [icon, setIcon] = useState(true)


    const changeIcon = () => {
        if(icon == true){
            setIcon(false)
        }else(
            setIcon(true)
        )
        
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light">
                <Link className="navbar-brand" to="/"><img src={Logo} width="100px" alt='Logo' /></Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav m-auto">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/">View <span class="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/createinvoice">Create Invoice</Link>
                        </li>
                        {/* <li className="nav-item">
                            <Link className="nav-link" to="/register">Registration</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li> */}
                    </ul>
                    <form className="form-inline my-2 my-lg-0">
                        <input class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-success my-2 my-sm-0" type="submit">Search</button>
                    </form>
                    <button className='btn' onClick={changeIcon} style={{borderRadius: "100px"}}>
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
