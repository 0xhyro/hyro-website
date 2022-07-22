import React from 'react'
import Mark from '../assets/images/mark-min.png'
import Home from '../assets/images/home.png'
import Bell from '../assets/images/bell.png'
import Loupe from '../assets/images/loupe.png'
import User from '../assets/images/user.png'
import { NavLink } from 'react-router-dom';
import { useWeb3React } from "@web3-react/core";
import {
  injected,
} from "../helpers/connectors";
import "../index.scss"


function Navbar() {
  const { account, activate, deactivate, chainId } = useWeb3React();

  const MetamaskConnector = async () => {
    try {
      await activate(injected);
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <>
      <nav className="navbar " style={{ borderBottom: '1px solid black' }}>
        <div className="container-fluid">
          <NavLink exact to="/main-app" className="navbar-brand">
            <h1>Hyro</h1>
          </NavLink>
          <NavLink exact to="/main-app" className="navbar-brand">
            <img src={Home} width="30" height="30" />
          </NavLink>
          <NavLink exact to="/my-profile" className="navbar-brand">
            <img src={User} width="30" height="30" />
          </NavLink>
          <img src={Bell} width="30" height="30" />
          <img src={Loupe} width="30" height="30" />

          {account ? (
            <>
              {chainId !== 1 ? (
                <span className="navbar-text text-danger" style={{ border: '1px solid', padding: '10px', borderRadius: "5px" }}>Change chain to Polygon</span>
              ) : (
                <div style={{ display: 'flex', gap: '20px', alignItems: 'baseline', alignItems: 'center' }}>
                  <p style={{ marginTop: '20px' }}>
                    Connected with {account.substring(0, 5)}...
                    {account.slice(account.length - 4)}
                  </p>
                  <img src={Mark} width="50" height="50" className="rounded-circle" />
                </div>
              )}
            </>
          ) : (
            <button type="button" className="btn-black" onClick={MetamaskConnector}>
              Connect
            </button>
          )}
        </div>
      </nav>
    </>
  )
}


export default Navbar
