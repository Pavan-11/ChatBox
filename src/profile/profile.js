import './profile.css';
import NavBar from '../NavBar/NavBar';
import { useDispatch } from 'react-redux';
import { authActions } from '../store/authReducer';
import ComposeMailForm from '../ComposeMail/ComposeMail';

const Profile = () => {
    const dispatch = useDispatch();

    return (
        <>
            <div className="container">
                <h1 style={{color: 'blueviolet'}}>MailBox</h1>
                <NavBar />
                <button className='btn' onClick={() => dispatch(authActions.logout())}>Logout</button>
            </div>
            <hr></hr>
            <ComposeMailForm />
        </>
    )
}
export default Profile;