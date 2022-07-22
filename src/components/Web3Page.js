import { useWeb3React } from "@web3-react/core";
import {
  injected,
  walletConnect,
  resetWalletConnector,
  walletlink,
} from "./Helpers/connectors";
import {
  getContract,
  tokenPrice,
  launchDate
} from "./Helpers/contractInfo";
import React from "react";
import { ethers } from "ethers";
import { useState, useEffect } from "react";

const Web3Page = () => {
  //connector, library, chainId, account, activate, deactivate
  const { library, account, activate, deactivate } = useWeb3React();
  const [supply, setSupply] = useState("1");
  const [error, setError] = useState("");

  //web3react
  const mint = async (mintNumber) => {
    try {
      setError('');
      const myContractSigner = getContract(library, account);
      const ethervalue = String(tokenPrice * mintNumber);
      await myContractSigner.publicSaleMint(mintNumber, {
        value: ethers.utils.parseEther(ethervalue),
      });
      console.log(account);
    } catch (err) {
      setError(String(err.error))
    };
  }

  const disconnect = () => {
    try {
      deactivate();
    } catch (ex) {
      console.log(ex);
    }
  };

  const MetamaskConnector = async () => {
    try {
      await activate(injected);
    } catch (ex) {
      console.log(ex);
    }
  };

  const WalletConnectConnector = async () => {
    try {
      console.log(library);
      resetWalletConnector(walletConnect);
      activate(walletConnect);
    } catch (ex) {
      console.log(ex);
    }
  };

  const CheckDate = () => {
    let now = Math.floor(Date.now() / 1000)
    if (now < launchDate)
      return (false)
    return true;
  }

  const CoinBaseConnector = async () => {
    try {
      await activate(walletlink);
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <div>
      {account ? (
        <div>
          <p>
            You're connected with {account.substring(0, 5)}...
            {account.slice(account.length - 4)}
          </p>
          {CheckDate ? <span>NotYet</span> :
            <button onClick={mint}>Mint</button>}
          <button onClick={disconnect}>Disconnect</button>
        </div>
      ) : (
        <button onClick={MetamaskConnector}>
          COnnectMetamask
        </button>
      )}
      <h3>{error}s</h3>
    </div>
  );
};
export default Web3Page
