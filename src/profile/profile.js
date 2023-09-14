import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { authActions } from '../store/authReducer';

const Profile = () => {
    const dispatch = useDispatch();

    return (
        <>
            <div className="container">
                <h1>WELCOME TO MailBox Client</h1>
                <Button variant="danger" onClick={() => dispatch(authActions.logout())}>Logout</Button>
            </div>
            <hr></hr>
        </>
    )
}
export default Profile;