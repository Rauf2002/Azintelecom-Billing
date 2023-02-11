import Header from './components/layout/Header';
import Account from './components/account/Account';

import React from 'react';
import AddTeam from './components/addTeam/AddTeam';
import {Route} from 'react-router-dom';

import { useState } from 'react';


function App() {

  const [isModalShown, setIsModalShown] = useState(false);


  function showModalHandler() {
    setIsModalShown(true);
  }

  function hideModalHandler() {
    setIsModalShown(false);
  }


  return (
    <React.Fragment>
      <Route exact path="/login">
        <Header />
      </Route>

      <Route exact path="/account">
        <Account onShowModal={showModalHandler} />
        {isModalShown && <AddTeam onHideModal={hideModalHandler} />}
      </Route>
    </React.Fragment>
  );
}

export default App;
