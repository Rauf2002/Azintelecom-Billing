import React from 'react';

import Logo2 from '../assets/azintelecomLogo2.png';
import Circle from '../assets/Sign_out_circle.png';
import Box from '../assets/User_box_duotone.png';
import Ring from '../assets/Add_ring.png';

import './Account.css';

import {NavLink} from 'react-router-dom';



function AccountHeader(props) {
    return (
        <React.Fragment>
            <div className='header'>
                <div>
                    <img src={Logo2} alt="" />
                </div>
                <div>
                    <div>
                        <button className='addBtn' onClick={props.onShowModal}><img src={Ring} alt="" /> <p>Elave et</p></button>
                    </div>
                    <div className='nameDiv'>
                        <img src={Box} alt="" />
                        <p>Allahverdiyev Rauf</p>
                    </div>
                    <div class='signoutDiv'>
                        <NavLink to="/login"><button class='signoutBtn'><img src={Circle} alt="" /></button></NavLink>
                    </div>
                </div>
            </div>
            <div className='main'>
                <div class="optionDiv">
                    <div class="selectedOption">
                        <p class="optionText selectedText">Komandalar</p>
                    </div>
                    <div>
                        <p class="optionText unselectedText">Ikiterefli baglanis</p>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default AccountHeader;