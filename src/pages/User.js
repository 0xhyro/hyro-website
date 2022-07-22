import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import NavBar from '../components/Navbar'
import Modal from '../components/Modal'

export default function User({ users }) {
  const { id } = useParams()
  const [singleUser, setSingleUser] = useState([])
  const [modal, setModal] = useState(false)

  if (modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  const toggleModal = () => {
    setModal(!modal)
  }

  useEffect(() => {
    const findUser = () => {
      const found = users.find((user) => (user.id == id))
      setSingleUser(found)
    }
    findUser()
  }, [id, users])
  return (
    <div className="container">
      {singleUser &&
        <>
          <NavBar />
          {modal && <Modal toggleModal={toggleModal} />}
          <div style={{ paddingTop: '30px' }} />
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 30 }}>
            <img style={{ borderRadius: '50%' }} src={singleUser.logo} width={200} height={200} />
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
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            {singleUser.description}
          </div>
          <div style={{ paddingTop: '30px' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 10 }}>
              <button className='btn-green' onClick={toggleModal}>Invest</button>
              <button className='btn-gray-outline'>Performances</button>
            </div>
          </div>
        </>
      }
    </div>
  )
}
