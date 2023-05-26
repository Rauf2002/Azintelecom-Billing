import React from 'react';

import Logo2 from '../assets/azintelecomLogo2.png';
import Circle from '../assets/Sign_out_circle.png';
import Box from '../assets/User_box_duotone.png';
import Ring from '../assets/Add_ring.png';

import './Account.css';

import {NavLink} from 'react-router-dom';

import { UseLogout } from '../../hooks/UseLogout';
import { UseAuthContext } from '../../hooks/UseContext';


function AccountHeader(props) {
    const { logout } = UseLogout();
    const { user } = UseAuthContext();

    return (
        <React.Fragment>
            <div className='header'>
                <div>
                    <img src={Logo2} alt="" />
                </div>
                <div>
                    <div>
                        <button className='addBtn' onClick={props.onShowModal}><img src={Ring} alt="" /> <p>Add Team</p></button>
                    </div>
                    <div className='nameDiv'>
                        <img src={Box} alt="" />
                        {user && <p>{user.email}</p>}
                    </div>
                    <div className='signoutDiv'>
                        <NavLink to="/login"><button class='signoutBtn' onClick={logout}><img src={Circle} alt="" /></button></NavLink>
                    </div>
                </div>
            </div>
            <div className='main'>
                <div className="optionDiv">
                    <div class="selectedOption">
                        <p class="optionText selectedText">Teams</p>
                    </div>
                    <div>
                        <p class="optionText unselectedText">Bilateral Connection</p>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default AccountHeader;