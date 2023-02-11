import React, { useEffect, useMemo, useState } from 'react';
import classes from './Header.css';

import {useHistory} from 'react-router-dom';



function FormInput() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isUsernameValid, setIsUsernameValid] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [isUsernameTouched, setIsUsernameTouched] = useState(false);
    const [isPasswordTouched, setIsPasswordTouched] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);
    const [isLoginSuccessful, setIsLoginSuccessful] = useState(true);
    const [usersArray, setUsersArray] = useState([]);



    // Fetching data


    async function GetData() {
        const response = await fetch('http://localhost:3000/users/');
        const data = await response.json();
        const transformedData = data.map((user) => {
            return {
                id: user.id,
                username: user.username,
                password: user.password
            }
        });

        setUsersArray(transformedData);
    }

    useEffect(() => {GetData();}, []);


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

    const navigate = useHistory();

    function successfullLoginHandler() {
        setIsLoginSuccessful(false);
        for (let u of usersArray) {
            if (username == u.username && password == u.password) {
                setIsLoginSuccessful(true);
                navigate.push("/account");
                return;
            } else {
                setIsLoginSuccessful(false);
            }
        }


    }

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
        submitForm();
        setIsUsernameTouched(false);
        setIsPasswordTouched(false);
    };

    const isValid = useMemo(() => {
        if (username.length && password.length) {
            return true;
        }
        return false;
    }, [username, password])

    useEffect(() => {
        console.log(isValid);
    }, [isValid])



    useEffect(() => {
        if (isUsernameValid && isPasswordValid) {
            setIsFormValid(true);
        }
    }, [isUsernameValid, isPasswordValid])

    const submitForm = () => {
        if (isValid) {
            console.log("login oldu");
            successfullLoginHandler();
        }
    }


    const warningMessage = <p className='warningText'>Istifadeci adi bosdur yaxud duzgun deyil.</p>;
    const warningMessage2 = <p className='warningText'>Sifre bos ola bilmez.</p>;
    const loginWarning = <p className='warningText'>Hesab tapilmadi.</p>

    const isUsernameInvalid = !isUsernameValid && isUsernameTouched;
    const isPasswordInvalid = !isPasswordValid && isPasswordTouched;

    const invalidUsernameClass = isUsernameInvalid ? 'inputs warningInput' : 'inputs';

    const invalidPasswordClass = isPasswordInvalid ? 'inputs warningInput' : 'inputs';

    return (
        <form onSubmit={formSubmissionHandler}>
            {isValid}
            <div className='inputDiv'>
                <label htmlFor='username'><p>Istifadeci adi</p></label>
                <input id='username' type="text" placeholder="Username" className={invalidUsernameClass} onChange={usernameChangeHandler} onBlur={usernameBlurHandler} />
                {isUsernameInvalid && warningMessage}
                <label htmlFor='password'><p>Sifre</p></label>
                <input id='password' type="password" placeholder="********" className={invalidPasswordClass} onChange={passwordChangeHandler} onBlur={passwordBlurHandler} />
                {isPasswordInvalid && warningMessage2}
            </div>
            <div className='btnDiv'>
                <button className='btnEnter' disabled={!isFormValid}>Daxil ol</button>
                {!isLoginSuccessful && loginWarning}
            </div>
        </form>
    );
}

export default FormInput;