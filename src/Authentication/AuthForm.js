import React, { useState, useRef, useEffect } from "react";
import classes from './AuthForm.module.css';
import LoaderEl from '../UI/Loader/Loader';
import { Form, Container } from 'react-bootstrap';

import { useNavigate } from "react-router-dom";

// import { Link } from "react-router-dom";

function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const confPassRef = useRef();
    const navigate = useNavigate()
    const [isPassSame, setIsPassSame] = useState(true);
    const [isError, setIsError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);



    const emailRef = useRef();
    const passRef = useRef();

    const switchAuthModeHandler = () => {
        setIsLogin((prevState) => !prevState);
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setIsPassSame(true);
        setIsError(false);

        if (passRef.current.value !== confPassRef.current.value) {
            setIsPassSame(false);
            return;
        }
        const email = emailRef.current.value;
        const password = passRef.current.value;

        if (isLogin) {
            try {
                setIsLoading(true);
                const response = await fetch(
                    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCc1DFQFUbZRDLki9bM5v-50uHdsd98I1w`,
                    {
                        method: "POST",
                        body: JSON.stringify({
                            email,
                            password,
                            returnSecureToken: true,
                        }),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                setIsLoading(false);
                console.log(response)
                if (response.ok) {
                    localStorage.setItem('token', response.idToken)
                    navigate('/')

                } else {
                    setIsError('sorry ! something went wrong')
                }
                const data = await response.json();

                localStorage.setItem("token", data.idToken);
                localStorage.setItem("email", data.email);
            } catch (err) {
                setIsLoading(false);
                setIsError(err);


            }
        } else {
            try {
                setIsLoading(true);
                console.log('email and password is ', email, password,)
                const response = await fetch(
                    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCc1DFQFUbZRDLki9bM5v-50uHdsd98I1w`,
                    {
                        method: "POST",
                        body: JSON.stringify({
                            email,
                            password,
                            returnSecureToken: true,
                        }),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                setIsLoading(false);

                if (response.ok) {
                    console.log("your authantication is successfull,", response);
                }
            } catch (err) {
                setIsLoading(false);
                setIsError(err);
                throw new Error("your authantication faied because, ", err);
            }
        }
    };



    return (
        <Container className={classes.auth}>
            <Form onSubmit={submitHandler} className={classes.form}>
                <h1>{isLogin ? "Login" : "Sign Up"}</h1>
                <Form.Group className={classes.control}>
                    <Form.Label htmlFor="email">Your Email</Form.Label>
                    <Form.Control type='email' id='email' required ref={emailRef} />
                </Form.Group>

                <Form.Group className={classes.control}>
                    <Form.Label htmlFor='password'>Your Password</Form.Label>
                    <Form.Control
                        type='password'
                        id='password'
                        required
                        ref={passRef}
                    />
                </Form.Group>

                <Form.Group className={classes.control}>
                    <Form.Label htmlFor="password">Confirm Password</Form.Label>
                    <Form.Control as="input" type="password" id="password" ref={confPassRef} required />
                </Form.Group>
                
                <div className={classes.actions}>
                {!isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
                {isLoading && <LoaderEl />}
                {!isPassSame && (
                    <p className="text-danger">Sorry both Passwrods should same</p>
                )}
                {isError && <p className="text-danger">{isError}</p>}
                    <button
                        type="button"
                        className={classes.toggle}
                        onClick={switchAuthModeHandler}
                    >
                        {isLogin ? "Create new account" : "Login with existing account"}
                    </button>
                </div>

            </Form>
        </Container>
    );
}

export default AuthPage;
{/* <button type="submit">{isLogin ? "Log In" : "Sign Up"}</button> */ }