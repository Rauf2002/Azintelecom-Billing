// CSS
import classes from './Header.css';

// React
import React, { useEffect, useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';

// Hooks
import { UseLogin } from '../../hooks/UseLogin';



function FormInput() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isUsernameValid, setIsUsernameValid] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [isUsernameTouched, setIsUsernameTouched] = useState(false);
    const [isPasswordTouched, setIsPasswordTouched] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);

    const {login, error, isPending} = UseLogin();



    function usernameChangeHandler(event) {
        setUsername(event.target.value);

        if (event.target.value.trim() !== '' || event.target.value.includes('@')) {
            setIsUsernameValid(true);
        }
    };

    function passwordChangeHandler(event) {
        setPassword(event.target.value);

        if (password.trim() !== '') {
            setIsPasswordValid(true);
        }
    };


    function usernameBlurHandler() {
        setIsUsernameTouched(true);

        if (username.trim() === '' || !username.includes('@')) {
            setIsUsernameValid(false);
        }
    };

    function passwordBlurHandler() {
        setIsPasswordTouched(true);

        if (password.trim() === '') {
            setIsPasswordValid(false);
        }
    };

    function formSubmissionHandler(event) {
        event.preventDefault();

        setIsUsernameTouched(true);
        setIsPasswordTouched(true);

        if (username.trim() === '' || !username.includes('@')) {
            return;
        }
        setIsUsernameValid(true);

        if (password.trim() === '') {
            return;
        }

        setIsPasswordValid(true);
        login(username, password);
        setIsUsernameTouched(false);
        setIsPasswordTouched(false);
    };

    useEffect(() => {
        if (isUsernameValid && isPasswordValid) {
            setIsFormValid(true);
        }
    }, [isUsernameValid, isPasswordValid])

    const warningMessage = <p className='warningText'>Username is either empty or invalid.</p>;
    const warningMessage2 = <p className='warningText'>Password cannot be empty.</p>;
    const loginWarning = <p className='warningText'>{error}</p>

    const isUsernameInvalid = !isUsernameValid && isUsernameTouched;
    const isPasswordInvalid = !isPasswordValid && isPasswordTouched;

    const invalidUsernameClass = isUsernameInvalid ? 'inputs warningInput' : 'inputs';

    const invalidPasswordClass = isPasswordInvalid ? 'inputs warningInput' : 'inputs';

    return (
        <form onSubmit={formSubmissionHandler}>
            <NavLink to="/signup"><p>Sign Up</p></NavLink>
            <div className='inputDiv'>
                <label htmlFor='username'><p>Username</p></label>
                <input id='username' type="text" placeholder="Username" className={invalidUsernameClass} onChange={usernameChangeHandler} onBlur={usernameBlurHandler} />
                {isUsernameInvalid && warningMessage}
                <label htmlFor='password'><p>Password</p></label>
                <input id='password' type="password" placeholder="********" className={invalidPasswordClass} onChange={passwordChangeHandler} onBlur={passwordBlurHandler} />
                {isPasswordInvalid && warningMessage2}
            </div>
            <div className='btnDiv'>
                {!isPending && <button className='btnEnter' disabled={!isFormValid}>Log In</button>}
                {isPending && <button className='btnEnter' disabled>Loading</button>}
                {error && loginWarning}
            </div>
        </form>
    );
}

export default FormInput;