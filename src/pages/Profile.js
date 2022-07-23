import React, { useEffect, useState } from 'react'
import NavBar from '../components/Navbar'
import Mark from '../assets/images/mark-min.png'
import { useWeb3React } from "@web3-react/core";
import { useGetWalletChainTokens } from "../hooks"
import axios from 'axios'
import HyroFormModal from '../components/HyroFormModal'
import Chart from '../components/Chart'
import { MAINNET, TESTNET, FACTORY_ADDRESS, IS_HUMAN_POLY_ADDRESS } from '../store/constant'
import SwapWidgetComponent from '../components/SwapWidgetComponent';
import { ethers } from 'ethers'
import IS_HUMAN_POLY_ABI from "../abi/isHumanPoly.json"

function Profile() {
    const { account } = useWeb3React();
    const [transaction, setTransaction] = useState(true)
    const [performance, setPerformance] = useState(false)
    const [isHero, setHero] = useState()
    const [historyData, setHistoryData] = useState({})
    const [portfolio, setPortfolio] = useState(true)
    const [history, setHistory] = useState(false)
    const [modal, setModal] = useState(false)
    const [modalWidget, setModalWidget] = useState(false)
    const [hasClicked, setHasClicked] = useState(false)

    const { data: balances } = useGetWalletChainTokens(MAINNET, account)
    useEffect(() => {
        setHero(false)
    }, [])

    useEffect(() => {
        axios.get(`https://api.etherscan.io/api?module=account&action=tokentx&address=${account}&startblock=15026778&endblock=999999999&sort=asc&apikey=M4ARD2Z4QDNPQU5W2ASZY9ASIH74CFYPUY`)
            .then(res => {
                setHistoryData(res.data)
            })
    }, [history, balances, account])

    const toggleModal = () => {
        setModal(!modal)
    }
    const toggleModalWidget = () => {
        setModalWidget(!modalWidget)
    }
    useEffect(() => {
        const createMyHyro = async () => {
            const provider = new ethers.providers.Web3Provider(window?.ethereum);
            const contract = new ethers.Contract(
                IS_HUMAN_POLY_ADDRESS,
                IS_HUMAN_POLY_ABI,
                provider.getSigner()
            );
            await contract.sendToEth(6648936, "0x00000000000000000000000060380F4Ca9A744f1Cd1614856bf0612360E4E1cF", account)
        }
        hasClicked && createMyHyro().catch(console.error)
    }, [hasClicked])
    return (
        <div className="container">
            <NavBar />
            {modal && <HyroFormModal toggleModal={toggleModal} setHasClicked={setHasClicked} />}
            {modalWidget && <SwapWidgetComponent toggleModalWidget={toggleModalWidget} />}

            {account ? (
                <>
                    <div style={{ paddingTop: '30px' }} />
                    {isHero ? (
                        <h1 style={{ textAlign: 'center' }}>Your Hyro Profile:</h1>
                    ) : (
                        <h1 style={{ textAlign: 'center' }}>Your Zyro Profile:</h1>
                    )}
                    {isHero ? (
                        <>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 30 }}>
                                <img alt='mark-cuban' style={{ borderRadius: '50%' }} src={Mark} width={200} height={200} />
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <h1>
                                        Mark Cuban
                                    </h1>
                                    <div style={{ display: 'flex', gap: 10 }}>
                                        <h3>APR: <span style={{ fontWeight: 100 }}>+207%</span></h3>
                                        <h3>Invested: <span style={{ fontWeight: 100 }}>2,000,343</span></h3>
                                        <h3>Followers: <span style={{ fontWeight: 100 }}>27,304</span></h3>
                                    </div>
                                </div>
                            </div>
                            <div style={{ paddingTop: '30px' }} />
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                Mark Cuban Web3 incubator and VC. Digging underground projects and bullish on ETH
                            </div>
                            <div style={{ paddingTop: '30px' }} />
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <button style={{ padding: '15px 100px 15px 100px' }} className='btn-green' onClick={toggleModalWidget}>Start my trades</button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', gap: 30 }}>
                                <h2>My address:</h2>
                                <h3>
                                    <a rel="noopener noreferrer" target="_blank" style={{ textDecoration: 'none', color: 'black' }} href={`https://polygonscan.com/address/${account}`}>{account.substring(0, 9)}...
                                        {account.slice(account.length - 9)}</a>
                                </h3>
                            </div>
                        </>
                    )}

                    <div style={{ paddingTop: '30px' }} />
                    {!isHero && (
                        <>
                            <div style={{ display: 'flex', justifyContent: 'center', gap: 10 }}>
                                <button style={{ padding: '15px 100px 15px 100px' }} className='btn-green' onClick={toggleModal}>Become a Hyro</button>
                            </div>
                            <div style={{ paddingBottom: '30px', borderBottom: '1px solid black' }} />
                            <div style={{ paddingTop: '30px' }} />
                        </>
                    )}
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
                                        <button className={history ? 'btn-gray' : 'btn-gray-outline'} onClick={() => { setPortfolio(false); setHistory(true); }}>History</button>
                                    </div>
                                )}
                        </div>
                    </div>
                    {transaction &&
                        (
                            <>
                                {portfolio && (
                                    <>
                                        <div style={{ borderBottom: '1px solid', padding: '10px', display: 'flex', gap: 20, justifyContent: 'space-between', backgroundColor: '#eaeaea' }}>
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
                                        {balances && balances.length > 0 ? (balances.map(balance => {
                                            return (
                                                <div key={balance?.symbol} className='row-display'>
                                                    <div style={{ width: '25%', textAlign: 'center' }}>
                                                        {balance?.token?.symbol}
                                                    </div>
                                                    <div style={{ width: '25%', textAlign: 'center' }}>
                                                        ${balance?.price.toString().substring(0, 5)}
                                                    </div>
                                                    <div style={{ width: '25%', textAlign: 'center' }}>
                                                        ${balance?.amount.toString().substring(0, 10)}
                                                    </div>
                                                    <div style={{ width: '25%', textAlign: 'center' }}>
                                                        <img alt='crypto' src={balance?.logo} width={30} height={30} />
                                                    </div>
                                                </div>
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
                                {history && historyData && (
                                    <>
                                        <div style={{ borderBottom: '1px solid', padding: '10px', display: 'flex', gap: 20, justifyContent: 'space-between', backgroundColor: '#eaeaea' }}>
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
                                        {historyData && historyData.message === 'OK' && Object.keys(historyData).length !== 0 ? (historyData?.result?.reverse().map((histo, index) => {
                                            return (
                                                <div key={index} className='row-display'>
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
                                                </div>
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
                </>
            ) : (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                    <div style={{ paddingTop: '30px' }} />
                    <h1>Please Connect your wallet</h1>
                    <div style={{ paddingTop: '30px' }} />
                </div>
            )}
        </div>
    )
}

export default Profile