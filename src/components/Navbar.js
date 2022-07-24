import React from 'react'
import Home from '../assets/images/home.png'
import User from '../assets/images/user.png'
import Logo from "../assets/images/hyroLogo.png"
import { NavLink } from 'react-router-dom';
import { useWeb3React } from "@web3-react/core";
import {
  injected,
} from "../helpers/connectors";
import "../index.scss"

function Navbar() {
  const { account, activate, chainId, deactivate } = useWeb3React();

  const MetamaskConnector = async () => {
    try {
      await activate(injected);
    } catch (ex) {
      console.log(ex);
    }
  };

  const disconnect = () => {
    try {
      deactivate();
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <>
      <nav className="navbar " style={{ borderBottom: '1px solid black' }}>
        <div className="container-fluid">
          <NavLink exact={true} to="/main-app" className="navbar-brand">
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <img alt='logo' src={Logo} width={50} height={50} />
              <h1 style={{ fontWeight: 700 }}>Hyro</h1>
            </div>
          </NavLink>
          <NavLink exact={true} to="/main-app" className="navbar-brand" activeClassName="underline">
            <img alt="home" src={Home} width="30" height="30" />
          </NavLink>
          <NavLink exact={true} to="/my-profile" className="navbar-brand" activeClassName="underline">
            <img alt="user" src={User} width="30" height="30" />
          </NavLink>
          {account ? (
            <>
              {chainId !== 137 ? (
                <span className="navbar-text text-danger" style={{ border: '1px solid', padding: '10px', borderRadius: "5px" }}>Change chain to Polygon</span>
              ) : (
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center', cursor: 'pointer' }} onClick={disconnect}>
                  <p style={{ marginTop: '20px' }}>
                    Connected with {account.substring(0, 5)}...
                    {account.slice(account.length - 4)}
                  </p>
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
