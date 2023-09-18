import {Link, useNavigate} from 'react-router-dom';
import React from 'react';
import './NavBar.css';
const NavBar = () => {

    return(
        <nav className='navbar'>
            <ul className='navbar-ul'>
                <li className='nav-item'>
                    <Link className='nav-link active' aria-current='profile' to='/'>Inbox</Link>
                </li>
                <li className='nav-item'>
                    <Link className='nav-link' to='/sent'>Sent</Link>
                </li>
                <li className='nav-item'>
                    <Link className='nav-link' to='/composeEmail'>Compose Mail</Link>
                </li>
            </ul>
        </nav>
    )
}

export default NavBar;
