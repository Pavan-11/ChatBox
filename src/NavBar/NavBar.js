import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css';
import { useDispatch } from 'react-redux';
import { authActions } from '../store/authReducer';

const NavBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleLogout = () => {
        console.log('logout clicked')
        dispatch(authActions.logout());
        navigate('/auth');
    }

    return (
        <>

            <div className="container">
                <h1>MailBox</h1>
                <ul className='navbar-ul'>
                    <li className='nav-item'>
                        <Link className='nav-link' to='/'>Inbox</Link>
                    </li>
                    <li className='nav-item'>
                        <Link className='nav-link' to='/sent'>Sent</Link>
                    </li>
                    <li className='nav-item'>
                        <Link className='nav-link' to='/composeEmail'>Compose Mail</Link>
                    </li>
                </ul>
                <button className='btn' onClick={handleLogout}>Logout</button>

            </div >
        </>

    )
}

export default NavBar;
