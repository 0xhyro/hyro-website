import React, { useState, useRef } from 'react'
import "../styles/modal.scss"

function HyroFormModal({ toggleModal }) {
    const [address, setAddress] = useState("0")
    const inputRef = useRef(null);

    function handleClick() {
        setAddress(inputRef.current.value);
    }
    console.log(address)
    return (
        <div className='modal' style={{ display: "flex" }} >
            <div className="overlay" onClick={toggleModal} ></div>
            <div className='modal-content'>
                <div className='main-content' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <h1 style={{textAlign: 'center'}}>Become a Hyro today!</h1>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 20 }}>
                        <div style={{ display: 'flex', gap: 20, alignItems: 'baseline', justifyContent: 'center' }}>
                            <p style={{ textAlign: 'center' }}>Address</p>
                            <input ref={inputRef} type="text" id="address" name="address" placeholder="0x..." style={{ padding: '10px', borderRadius: '5px', backgroundColor: '#EAEAEA' }} />
                        </div>
                        <button onClick={handleClick} className='btn-green'>Join</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HyroFormModal