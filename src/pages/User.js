import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import NavBar from '../components/Navbar'
import Modal from '../components/Modal'
import { useGetWalletChainTokens } from "../hooks"
import users from "../store/users.json"
import axios from 'axios'

export default function User() {
  const { id } = useParams()
  const [singleUser, setSingleUser] = useState([])
  const [modal, setModal] = useState(false)
  const [transaction, setTransaction] = useState(true)
  const [performance, setPerformance] = useState(false)
  const [portfolio, setPortfolio] = useState(true)
  const [history, setHistory] = useState(false)
  const [historyData, setHistoryData] = useState({})
  const [amountInvest, setAmountInvest] = useState("0")

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

  // 0x06959153B974D0D5fDfd87D561db6d8d4FA0bb0B
  const { data: balances } = useGetWalletChainTokens(137, singleUser?.wallet)
  useEffect(() => {
    axios.get(`https://api.etherscan.io/api?module=account&action=tokentx&address=${singleUser?.wallet}&startblock=15026778&endblock=999999999&sort=asc&apikey=M4ARD2Z4QDNPQU5W2ASZY9ASIH74CFYPUY`)
      .then(res => {
        setHistoryData(res.data)
      })
  }, [singleUser, history, balances])

  return (
    <div className="container">
      {singleUser &&
        <>
          <NavBar />
          {modal && <Modal toggleModal={toggleModal} setAmountInvest={setAmountInvest} />}
          <div style={{ paddingTop: '30px' }} />
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 30 }}>
            <img alt='user' style={{ borderRadius: '50%' }} src={singleUser.logo} width={200} height={200} />
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
              <button className='btn-green' onClick={toggleModal}>Invest</button>
            </div>
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
                      <div style={{ borderBottom: '1px solid', padding: '10px', display: 'flex', gap: 20, justifyContent: 'space-between', backgroundColor: '#D9D9D9' }}>
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
                      <div style={{ borderBottom: '1px solid', padding: '10px', display: 'flex', gap: 20, justifyContent: 'space-between', backgroundColor: '#D9D9D9' }}>
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
                      {historyData && historyData.message === 'OK' && Object.keys(historyData).length !== 0 ? (historyData?.result?.reverse().slice(0,20).map((histo, index) => {
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
                              {histo?.value}
                            </div>
                            <div style={{ width: '25%', textAlign: 'center' }}>
                              {histo?.tokenName}
                            </div>
                          </a>
                        )
                      })) : (
                        <h1 style={{ textAlign: 'center' }}>No data on Polygon</h1>
                      )}
                    </>
                  )}
                </>
              )}
            {performance && (
              <h1>Performance</h1>
            )}
          </div>
        </>
      }
    </div>
  )
}
