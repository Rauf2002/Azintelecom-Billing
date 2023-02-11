import React from 'react';

import logoImage from '../assets/logo.png';

import FormInput from './FormInput';

import classes from './Header.css';




function Header() {
    return (
        <React.Fragment>
            <div className='container'>
                <div className='form'>
                    <div>
                        <img src={logoImage} />
                    </div>
                    <FormInput />
                </div>
            </div>
        </React.Fragment>
    );
}

export default Header;