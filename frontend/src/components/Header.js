import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from "../Images/new_logo.svg"
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
                            <NavLink className={`nav-link ${icon ? 'bold' : 'bg-white text-dark'}`} exact="true" to="/">View</NavLink>
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
                    {/* <button className={`btn icon ${icon ? 'bold' : 'bg-white'}`} onClick={changeIcon}>
                        {icon ?
                            (<Icon className='moon' size='large' />)
                            :
                            (<Icon className='sun' size='large' />)}
                    </button> */}
                </div>
            </nav>
        </>
    )
}

// { text: 'Agricultural Economics & Policy', value: 'Agricultural Economics & Policy' },
// { text: 'Agricultural Engineering', value: 'Agricultural Engineering' },
// { text: 'Agriculture, Dairy & Animal Science', value: 'Agriculture, Dairy & Animal Science' },
// { text: 'Agriculture, Multidisciplinary', value: 'Agriculture, Multidisciplinary' },
// { text: 'Agronomy', value: 'Agronomy' },
// { text: 'Allergy', value: 'Allergy' },
// { text: 'Anatomy & Morphology', value: 'Anatomy & Morphology' },
// { text: 'Andrology', value: 'Andrology' },
// { text: 'Anaesthesiology', value: 'Anaesthesiology' },
// { text: 'Anthropology', value: 'Anthropology' },
// { text: 'Behavioural Sciences', value: 'Behavioural Sciences' },
// { text: 'Biochemical Research Methods', value: 'Biochemical Research Methods' },
// { text: 'Biochemistry & Molecular Biology', value: 'Biochemistry & Molecular Biology' },
// { text: 'Biodiversity Conservation', value: 'Biodiversity Conservation' },
// { text: 'Biology', value: 'Biology' },
// { text: 'Biophysics', value: 'Biophysics' },
// { text: 'Biotechnology & Applied Microbiology', value: 'Biotechnology & Applied Microbiology' },
// { text: 'Cardiac & Cardiovascular Systems', value: 'Cardiac & Cardiovascular Systems' },
// { text: 'Cell & Tissue Engineering', value: 'Cell & Tissue Engineering' },
// { text: 'Cell Biology', value: 'Cell Biology' },
// { text: 'Clinical Neurology', value: 'Clinical Neurology' },
// { text: 'Critical Care Medicine', value: 'Critical Care Medicine' },
// { text: 'Dentistry', value: 'Dentistry' },
// { text: 'Oral Surgery & Medicine', value: 'Oral Surgery & Medicine' },
// { text: 'Dermatology', value: 'Dermatology' },
// { text: 'Development Studies', value: 'Development Studies' },
// { text: 'Ecology', value: 'Ecology' },
// { text: 'Endocrinology & Metabolism', value: 'Endocrinology & Metabolism' },
// { text: 'Entomology', value: 'Entomology' },
// { text: 'Environmental Sciences', value: 'Environmental Sciences' },
// { text: 'Environmental Studies', value: 'Environmental Studies' },
// { text: 'Evolutionary Biology', value: 'Evolutionary Biology' },
// { text: 'Fisheries', value: 'Fisheries' },
// { text: 'Food Science & Technology, Forestry'}


export default Header;
