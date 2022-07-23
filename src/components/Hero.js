import React from 'react'
import "../index.scss"
import "../styles/modal.scss"
import { NavLink } from 'react-router-dom';

function Hero() {

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', gap: '30px' }}>
            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', textAlign: 'center', borderRight: '2px solid black', width: '50%' }}>
                <h1 style={{ fontWeight: 700, fontSize: '9rem' }}>Hyro</h1>
                <h4 style={{ fontWeight: 100 }}>From Zyro to Hero</h4>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', textAlign: 'center', width: '50%', gap: 10 }}>
                <div style={{ width: '100%' }}>
                    <NavLink exact to="/main-app">
                        <button style={{ width: '50%' }} className='btn-green'>Launch App</button>
                    </NavLink>
                </div>
                <div style={{ width: '100%', display: 'flex', gap: 10, justifyContent: 'center' }}>
                    <button style={{ width: '24%' }} className='btn-black-sm'>Google</button>
                    <button style={{ width: '24%' }} className='btn-black-sm'>App Store</button>
                </div>
            </div>
        </div>
    )
}

export default Hero
