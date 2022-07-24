import React from 'react'
import "../styles/modal.scss"

function HyroFormModal({ toggleModal, setHasClicked }) {

    const handleClick = async () => {
        setHasClicked(true);
        toggleModal()
    }
    return (
        <div className='modal' style={{ display: "flex" }} >
            <div className="overlay" onClick={toggleModal} ></div>
            <div className='modal-content'>
                <div className='main-content' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <h1 style={{ textAlign: 'center' }}>Become a Hyro today!</h1>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 20 }}>
                        <div style={{}}>
                            <p style={{ textAlign: 'center' }}>Click below to become a Hyro!</p>
                        </div>
                        <button onClick={handleClick} className='btn-green'>Join</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HyroFormModal