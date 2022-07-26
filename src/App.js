import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/Home'
import User from './pages/User'
import MainApp from './pages/MainApp'
import Profile from './pages/Profile'
import { Web3Provider } from '@ethersproject/providers';
import { Web3ReactProvider } from '@web3-react/core';

function App() {
  const getLibrary = (provider) => {
    const library = new Web3Provider(provider, 'any');
    library.pollingInterval = 15000;
    return library;
  };
  return (
    <BrowserRouter>
      <Web3ReactProvider getLibrary={getLibrary} >
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/main-app" component={MainApp} />
          <Route exact path="/my-profile" component={Profile} />
          <Route path="/:id" component={User} />
        </Switch>
      </Web3ReactProvider>
    </BrowserRouter>
  );
}

export default App;
