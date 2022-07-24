import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import NavBar from '../components/Navbar'
import Modal from '../components/Modal'
import { useGetWalletChainTokens } from "../hooks"
import users from "../store/users.json"
import axios from 'axios'
import Chart from '../components/Chart'
import { MAINNET, FACTORY_ADDRESS } from '../store/constant'
import HYRO_ABI from "../abi/hyro.json"
import FACTORY_ABI from "../abi/factory.json"
import { ethers } from 'ethers'
import { useWeb3React } from "@web3-react/core";

export default function User() {
  const { id } = useParams()
  const { account } = useWeb3React();
  const [singleUser, setSingleUser] = useState([])
  const [modal, setModal] = useState(false)
  const [transaction, setTransaction] = useState(true)
  const [performance, setPerformance] = useState(false)
  const [portfolio, setPortfolio] = useState(true)
  const [history, setHistory] = useState(false)
  const [historyData, setHistoryData] = useState({})
  const [amountInvest, setAmountInvest] = useState("0")
  const [hasClicked, setHasClicked] = useState(false)
  const [hyroContractAddress, setHyroContractAddressd] = useState("0")


  if (modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  const toggleModal = () => {
    setModal(!modal)
  }

  useEffect(() => {
    setSingleUser(users[id])
  }, [id])

  const { data: balances } = useGetWalletChainTokens(MAINNET, singleUser?.wallet)
  useEffect(() => {
    axios.get(`https://api.etherscan.io/api?module=account&action=tokentx&address=${singleUser?.wallet}&startblock=15026778&endblock=999999999&sort=asc&apikey=M4ARD2Z4QDNPQU5W2ASZY9ASIH74CFYPUY`)
      .then(res => {
        setHistoryData(res.data)
      })
  }, [singleUser, history, balances])


  //TO GET ADDRESS OF SMART CONTRACT OF HYRO
  useEffect(() => {
    const getHyroContractAddress = async () => {
      const provider = new ethers.providers.Web3Provider(window?.ethereum);
      const contract = new ethers.Contract(
        FACTORY_ADDRESS,
        FACTORY_ABI,
        provider.getSigner()
      );
      const tempAddress = await contract.getHyro(singleUser?.wallet)
      setHyroContractAddressd(tempAddress)
    }
    hasClicked && getHyroContractAddress().catch(console.error)
  }, [hasClicked, singleUser?.wallet])

  //TO INVEST
  useEffect(() => {
    const investOnHyro = async () => {
      const provider = new ethers.providers.Web3Provider(window?.ethereum);
      const contract = new ethers.Contract(
        hyroContractAddress,
        HYRO_ABI,
        provider.getSigner()
      );
      // await contract.mint(account, amountInvest, PATH)
    }
    hyroContractAddress !== "0x0000000000000000000000000000000000000000" && investOnHyro().catch(console.error)
  }, [hyroContractAddress])
  console.log(hasClicked)
  console.log(hyroContractAddress)
  console.log(amountInvest)
  return (
    <div className="container">
      {singleUser &&
        <>
          <NavBar />
          {modal && <Modal toggleModal={toggleModal} setAmountInvest={setAmountInvest} name={singleUser?.name} setHasClicked={setHasClicked} />}
          <div style={{ paddingTop: '30px' }} />
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 30 }}>
            <img alt='user' style={{ borderRadius: '50%' }} src={singleUser?.logo} width={200} height={200} />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <h1>
                {singleUser.name}
              </h1>
              <div style={{ display: 'flex', gap: 10 }}>
                <h3>APR: <span style={{ fontWeight: 100 }}>{singleUser.apr}</span></h3>
                <h3>Invested: <span style={{ fontWeight: 100 }}>{singleUser.invested}</span></h3>
                <h3>Followers: <span style={{ fontWeight: 100 }}>{singleUser.followers}</span></h3>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '30px' }}>
            {singleUser.description}
          </div>
          <div style={{ paddingTop: '30px' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 10 }}>
              <button style={{ padding: '15px 100px 15px 100px' }} className='btn-green' onClick={toggleModal}>Invest</button>
            </div>
            <div style={{ paddingBottom: '30px', borderBottom: '1px solid black' }} />
            <div style={{ paddingTop: '30px' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingBottom: '50px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 10 }}>
                  <button className={transaction ? 'btn-gray' : 'btn-gray-outline'} onClick={() => { setTransaction(true); setPerformance(false); }}>My transactions</button>
                  <button className={performance ? 'btn-gray' : 'btn-gray-outline'} onClick={() => { setTransaction(false); setPerformance(true); }}>Performances</button>
                </div>
                {transaction &&
                  (
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 10 }}>
                      <button className={portfolio ? 'btn-gray' : 'btn-gray-outline'} onClick={() => { setPortfolio(true); setHistory(false); }}>Portfolio</button>
                      <button className={history ? 'btn-gray' : 'btn-gray-outline'} onClick={() => { setHistory(true); setPortfolio(false); }}>History</button>
                    </div>
                  )}
              </div>
            </div>
            {transaction &&
              (
                <>
                  {portfolio && (
                    <>
                      <h1 style={{ textAlign: 'center' }}>Portfolio</h1>
                      <div style={{ boxShadow: '5px 5px 5px #D9D9D9', borderRadius: '15px', padding: '10px', display: 'flex', gap: 20, justifyContent: 'space-between', alignItems: 'center', fontWeight: 700, fontSize: "1.5em", backgroundColor: '#eaeaea' }}>
                        <div style={{ width: '25%', textAlign: 'center' }}>
                          Asset
                        </div>
                        <div style={{ width: '25%', textAlign: 'center' }}>
                          Price
                        </div>
                        <div style={{ width: '25%', textAlign: 'center' }}>
                          Amount
                        </div>
                        <div style={{ width: '25%', textAlign: 'center' }}>
                          logo
                        </div>
                      </div>
                      {balances && balances.map((balance, index) => {
                        return (
                          <div key={index} className='row-display'>
                            <div style={{ width: '25%', textAlign: 'center' }}>
                              {balance?.token?.symbol}
                            </div>
                            <div style={{ width: '25%', textAlign: 'center' }}>
                              ${balance?.price.toString().substring(0, 5)}
                            </div>
                            <div style={{ width: '25%', textAlign: 'center' }}>
                              ${balance?.amount.toLocaleString('en-US')}
                            </div>
                            <div style={{ width: '25%', textAlign: 'center' }}>
                              <img alt='logo' src={balance?.logo} width={30} height={30} />
                            </div>
                          </div>
                        )
                      })}
                      <div style={{ paddingBottom: '50px' }} />
                    </>
                  )}
                  {history && historyData && (
                    <>
                      <h1 style={{ textAlign: 'center' }}>History</h1>
                      <div style={{ boxShadow: '5px 5px 5px #D9D9D9', borderRadius: '15px', padding: '10px', display: 'flex', gap: 20, justifyContent: 'space-between', alignItems: 'center', fontWeight: 700, fontSize: "1.5em", backgroundColor: '#eaeaea' }}>
                        <div style={{ width: '25%', textAlign: 'center' }}>
                          Txn Hash
                        </div>
                        <div style={{ width: '25%', textAlign: 'center' }}>
                          Block
                        </div>
                        <div style={{ width: '25%', textAlign: 'center' }}>
                          Amount
                        </div>
                        <div style={{ width: '25%', textAlign: 'center' }}>
                          Name
                        </div>
                      </div>
                      {historyData && historyData.message === 'OK' && Object.keys(historyData).length !== 0 ? (historyData?.result?.reverse().slice(0, 20).map((histo, index) => {
                        return (
                          <a key={index} rel="noopener noreferrer" target="_blank" className='row-display-click' href={`https://polygonscan.com/block/${histo?.blockNumber?.toString()}`}>
                            <div style={{ width: '25%', textAlign: 'center' }}>
                              {histo?.blockHash?.toString().substring(0, 20)}
                            </div>
                            <div style={{ width: '25%', textAlign: 'center' }}>
                              {histo?.blockNumber}
                            </div>
                            <div style={{ width: '25%', textAlign: 'center' }}>
                              {/* {ethers.utils.parseUnits(histo?.value, histo?.tokenDecimal)} */}
                              {histo?.value.toString().substring(0, 5)}
                            </div>
                            <div style={{ width: '25%', textAlign: 'center' }}>
                              {histo?.tokenName}
                            </div>
                          </a>
                        )
                      })) : (
                        <>
                          <div style={{ paddingTop: '30px' }} />
                          <h1 style={{ textAlign: 'center' }}>No data on Polygon</h1>
                          <div style={{ paddingTop: '30px' }} />
                        </>
                      )}
                    </>
                  )}
                </>
              )}
            {performance && (
              <>
                <h1 style={{ textAlign: 'center' }}>Performance</h1>
                <Chart />
              </>
            )}
          </div>
        </>
      }
    </div>
  )
}
