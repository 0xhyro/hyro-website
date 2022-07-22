import React, { useState } from 'react'
import NavBar from '../components/Navbar'
import Mark from '../assets/images/mark-min.png'
import { useWeb3React } from "@web3-react/core";
import {useGetChainsBalances} from "../hooks"

function Profile() {
    const { account } = useWeb3React();
    const [transaction, setTransaction] = useState(true)
    const [performance, setPerformance] = useState(false)

    const [portfolio, setPortfolio] = useState(true)
    const [history, setHistory] = useState(false)

    const {data: balances } = useGetWalletChainTokens(43114)
    console.log(balances?.total)
    return (
        <div className="container">
            <NavBar />
            {account ? (
                <>
                    <div style={{ paddingTop: '30px' }} />
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 30 }}>
                        <img style={{ borderRadius: '50%' }} src={Mark} width={200} height={200} />
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
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        Mark Cuban Web3 incubator and VC. Digging underground projects and bullish on ETH
                    </div>
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
                                        <div style={{ borderBottom: '1px solid', padding: '10px', display: 'flex', gap: 20, justifyContent: 'space-between', backgroundColor: '#D9D9D9' }}>
                                            <div>
                                                Asset
                                            </div>
                                            <div>
                                                Price
                                            </div>
                                            <div>
                                                Stake
                                            </div>
                                            <div>
                                                Volume
                                            </div>
                                        </div>
                                        <div style={{ borderBottom: '1px solid', padding: '10px', display: 'flex', gap: 20, justifyContent: 'space-between' }}>
                                            <div>
                                                BTC
                                            </div>
                                            <div>
                                                $22,000
                                            </div>
                                            <div>
                                                100,394
                                            </div>
                                            <div>
                                                773,994
                                            </div>
                                        </div>
                                        <div style={{ borderBottom: '1px solid', padding: '10px', display: 'flex', gap: 20, justifyContent: 'space-between' }}>
                                            <div>
                                                ETH
                                            </div>
                                            <div>
                                                1,546
                                            </div>
                                            <div>
                                                774,093
                                            </div>
                                            <div>
                                                11,299,032
                                            </div>
                                        </div>
                                    </>
                                )}
                                {history && (
                                    <div>
                                        history
                                    </div>
                                )}
                            </>
                        )}
                    {performance && (
                        <h1>Performance</h1>
                    )}
                </>
            ) : (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                    <h1>Please Connect your wallet</h1>
                </div>
            )}
        </div>
    )
}

export default Profile