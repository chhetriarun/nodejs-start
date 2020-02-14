import React from 'react'
import { NavLink } from 'react-router-dom'
import './sidebar.component.css'
export const Sidebar = () => {
    return (
        <React.Fragment>
            <ul className="sidebar">
                <li className="side-item">
                    <NavLink to='/add-blog'>Add-Blog</NavLink>
                </li>
                <li className="side-item">
                    <NavLink to='/View-blogs'>View-blogs</NavLink>
                </li>
                <li className="side-item">
                    <NavLink to='/search-blogs'>Search-Blogs</NavLink>
                </li>
                <li className="side-item">
                    <NavLink to='/profile'>profile</NavLink>
                </li>


            </ul>
        </React.Fragment>
    )
}