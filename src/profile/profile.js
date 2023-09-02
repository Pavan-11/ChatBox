import {Button} from 'react-bootstrap';
import { useDispatch} from 'react-redux';
import { authActions } from '../store/authReducer';

const Profile = () => {
    const dispatch = useDispatch();

    return (
        <>
        <h1>WELCOME</h1>
        <Button variant="danger" onClick={() => dispatch(authActions.logout())}>Logout</Button>
        </>
    )
}
export default Profile;