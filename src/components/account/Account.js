import React from 'react';

import AccountHeader from './AccountHeader';
import Search from './Search';

function Account(props) {
    return (
        <React.Fragment>
            <AccountHeader onShowModal={props.onShowModal} />
            <Search />
        </React.Fragment>
    );
}

export default Account;