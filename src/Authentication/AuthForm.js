import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../store/authReducer';
import {useHistory} from 'react-router-dom';
import { useState, useRef } from 'react';
import {Form, Button, Container} from 'react-bootstrap';
import classes from './AuthForm.module.css';



const AuthForm = () => {
    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    const history = useHistory();


    // const authCtx = useContext(AuthContext)
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);


    const switchAuthModeHandler = () => {
        setIsLogin((prevState) => !prevState);
    };

    const submitHandler = (event) => {
        event.preventDefault();
        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;

        setIsLoading(true);

        let url;

        if (isLogin) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCc1DFQFUbZRDLki9bM5v-50uHdsd98I1w'
        } else {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCc1DFQFUbZRDLki9bM5v-50uHdsd98I1w'
        }
        fetch(url,
            {
                method: 'POST',
                body: JSON.stringify({
                    email: enteredEmail,
                    password: enteredPassword,
                    returnSecureToken: true
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).then(res => {

            setIsLoading(false);

            if (res.ok) {
                return res.json();
            } else {
                return res.json().then(data => {
                    let errorMessage = 'Authentication Failed';
                    throw new Error(errorMessage);
                });
            }
        }).then(data => {
            dispatch(authActions.login());
            console.log("this is data", data)
            history.replace('/profile')
        }).catch(err => {
            alert(err.message);
        })
    }

    return (
        <Container className={classes.auth}>
            <Form onSubmit={submitHandler} >

                    <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
                    <Form.Group className={classes.control}>
                        <Form.Label htmlFor='email'>Your Email</Form.Label>
                        <Form.Control type='email' id='email' required ref={emailInputRef} />
                    </Form.Group>
                    <Form.Group className={classes.control}>
                        <Form.Label htmlFor='password'>Your Password</Form.Label>
                        <Form.Control
                            type='password'
                            id='password'
                            required
                            ref={passwordInputRef}
                        />
                    </Form.Group>



                <div className={classes.actions}>
                    {!isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
                    {isLoading && <p>Sending Request...</p>}
                    {!isLoggedIn && (<button
                        type='button'
                        className={classes.toggle}
                        onClick={switchAuthModeHandler}
                    >
                        {isLogin ? 'Create new account' : 'Login with existing account'}
                    </button>
                    )}

                    {isLoggedIn && (
                        <button onClick={() => dispatch(authActions.logout())}>
                            Logout
                        </button>
                    )}
                </div>
            </Form>
        </Container>
    );
};

export default AuthForm;
