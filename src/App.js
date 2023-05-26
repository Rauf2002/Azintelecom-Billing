import Header from './components/layout/Header';
import Account from './components/account/Account';

import React from 'react';
import AddTeam from './components/addTeam/AddTeam';
import Signup from './components/layout/Signup';

import { Route, Switch, Redirect } from 'react-router-dom';
import { UseAuthContext } from './hooks/UseContext';

import { useState } from 'react';



function App() {

  const [isModalShown, setIsModalShown] = useState(false);


  function showModalHandler() {
    setIsModalShown(true);
  }

  function hideModalHandler() {
    setIsModalShown(false);
  }

  const { authIsReady, user } = UseAuthContext();

  return (
    <React.Fragment>
      {authIsReady && (
        <Switch>
          <Route exact path="/">
            {user && <Redirect to="/account" />}
            {!user && <Header />}
          </Route>
          <Route exact path="/login">
            {user && <Redirect to="/account" />}
            {!user && <Header />}
          </Route>
          <Route exact path="/signup">
            {user && <Redirect to="/account" />}
            {!user && <Signup />}
          </Route>
          <Route exact path="/account">
            {user && (<>
              <Account onShowModal={showModalHandler} />
              {isModalShown && <AddTeam onHideModal={hideModalHandler} />}
            </>)}
            {!user && <Redirect to="/" />}
          </Route>
        </Switch>
      )}
    </React.Fragment>
  );
}

export default App;
