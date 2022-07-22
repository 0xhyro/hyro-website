import React, { useState, useRef } from 'react'
import "../styles/modal.scss"

function Modal({ toggleModal }) {
    const[amount, setAmount] = useState("0")
    const inputRef = useRef(null);

    function handleClick() {
        setAmount(inputRef.current.value);
    }
    console.log(amount)
    return (
        <>
            <div className='modal' style={{ display: "flex" }} >
                <div className="overlay" onClick={toggleModal} ></div>
                <div className='modal-content'>
                    <div className='main-content' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <h1>You're investing in Mark</h1>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 20 }}>
                            <p>Amount</p>
                            <input ref={inputRef} type="text" id="amount" name="amount" placeholder="$300" style={{ padding: '10px', borderRadius: '5px', backgroundColor: '#EAEAEA' }} />
                            <button onClick={handleClick} className='btn-green'>Invest</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal
