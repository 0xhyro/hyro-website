import React from 'react'
import Home from '../assets/images/home.png'
import Bell from '../assets/images/bell.png'
import Loupe from '../assets/images/loupe.png'
import User from '../assets/images/user.png'
import { Link } from 'react-router-dom';
import { useWeb3React } from "@web3-react/core";
import {
  injected,
} from "../helpers/connectors";
import "../index.scss"


function Navbar() {
  const { account, activate, chainId } = useWeb3React();

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
          <Link exact='true' to="/main-app" className="navbar-brand">
            <h1 style={{fontWeight: 700}}>Hyro</h1>
          </Link>
          <Link exact='true' to="/main-app" className="navbar-brand">
            <img alt="home" src={Home} width="30" height="30" />
          </Link>
          <Link exact='true' to="/my-profile" className="navbar-brand">
            <img alt="user" src={User} width="30" height="30" />
          </Link>
          <img alt="bell" src={Bell} width="30" height="30" />
          <img alt="loupe" src={Loupe} width="30" height="30" />

          {account ? (
            <>
              {chainId !== 1 ? (
                <span className="navbar-text text-danger" style={{ border: '1px solid', padding: '10px', borderRadius: "5px" }}>Change chain to Polygon</span>
              ) : (
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
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
