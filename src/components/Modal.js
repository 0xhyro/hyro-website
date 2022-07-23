import React, { useRef } from 'react'
import "../styles/modal.scss"

function Modal({ toggleModal, setAmountInvest, name, setHasClicked }) {
    const inputRef = useRef(null);

    function handleClick() {
        setAmountInvest(inputRef.current.value);
        setHasClicked(true)
        toggleModal()
    }
    return (
        <>
            <div className='modal' style={{ display: "flex" }} >
                <div className="overlay" onClick={toggleModal} ></div>
                <div className='modal-content'>
                    <div className='main-content' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <h1 style={{textAlign: 'center'}}>You're investing in {name}</h1>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 20 }}>
                            <div style={{ display: 'flex', gap: 20, alignItems: 'baseline', justifyContent: 'center' }}>
                                <p style={{ textAlign: 'center' }}>Amount</p>
                                <input ref={inputRef} type="text" id="amount" name="amount" placeholder="$300" style={{ padding: '10px', borderRadius: '5px', backgroundColor: '#EAEAEA' }} />
                            </div>
                            <button onClick={handleClick} className='btn-green'>Invest</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal
