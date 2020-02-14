import React, { Component } from 'react';
import { NavLink,withRouter } from 'react-router-dom';
import './navBar.component.css'
// import logout from '../../logout/logout.component';
const NavBar = (props) =>{
const logout = () =>{
    localStorage.clear();
    props.history.push('/');
}

    
        return (
            <ul className="nav">
                <li className="nav-item">
                    <NavLink to='/home'>Home</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to='/contact'>Contact</NavLink>
                </li>
                {/* <li className="nav-item">
                    <NavLink to='/'>Login</NavLink>
                </li> */}
                {/* <li className="nav-item">
                    <NavLink to='/register'>Register</NavLink>
                </li> */}
                <li >
                    <button className="btn btn-info" onClick={logout}>Logout</button>
                </li>


            </ul>
        )
    
}
export default withRouter(NavBar);