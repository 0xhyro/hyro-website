import React from 'react'
import { SwapWidget } from '@uniswap/widgets'
import '@uniswap/widgets/dist/fonts.css'
import { ethers } from 'ethers'
import "../styles/modal.scss"

const theme = {
    primary: '#000',
    secondary: '#666',
    interactive: '#0089EC',
    container: '#FFF',
    module: '#E7E7E7',
    accent: '#3D3B31',
    outline: '#343D3A',
    dialog: '#FFF',
    fontFamily: 'Verdana',
    borderRadius: 0.8,
}

function SwapWidgetComponent({ toggleModalWidget }) {
    const provider = new ethers.providers.Web3Provider(window?.ethereum);
    const jsonRpcEndpoint = "https://polygon-rpc.com"
    return (
        <div className='modal' style={{ display: "flex" }} >
            <div className="overlay" onClick={toggleModalWidget} ></div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div className='main-content' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <SwapWidget
                        provider={provider}
                        jsonRpcEndpoint={jsonRpcEndpoint}
                        theme={theme}
                    />
                </div>
            </div>
        </div>
    )
}

export default SwapWidgetComponent