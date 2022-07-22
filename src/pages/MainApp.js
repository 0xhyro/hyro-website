import React, { useEffect, useState } from 'react'
import NavBar from '../components/Navbar'
import Users from '../store/users.json'
import { Link } from 'react-router-dom'

export default function MainApp() {
  const [color, setColor] = useState("")

  useEffect(() => {
    const greenColor = (word) => {
      word.charAt(0) === '-' ? setColor('red') : setColor('green')
    }
    greenColor("+300")
  })

  return (
    <div className="container">
      <NavBar />
      <div style={{ paddingTop: '30px' }} />
      <input type="text" id="search" name="search" placeholder="Search" style={{ padding: '10px', width: '100%', borderRadius: '5px', backgroundColor: '#EAEAEA' }} />
      <div style={{ paddingTop: '30px' }} />
      <div style={{ borderBottom: '1px solid', padding: '10px', display: 'flex', gap: 20, justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: 20 }}>
          <div>
            Id
          </div>
          <div>
            Name
          </div>
        </div>
        <div style={{ display: 'flex', gap: 20 }}>
          <div>
            Invested
          </div>
          <div>
            APR
          </div>
        </div>
      </div>
      {Users.map(user => {
        return (
          <Link exact to={`/${user.id}`} key={user.id} style={{ textDecoration: 'none', color: 'black' }}>
            <div style={{ borderBottom: '1px solid', padding: '10px', display: 'flex', gap: 20, justifyContent: 'space-between', cursor: 'pointer' }}>
              <div style={{ display: 'flex', gap: 20 }}>
                <div>
                  {user.id}
                </div>
                <div>
                  {user.name}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 20 }}>
                <div>
                  {user.invested}
                </div>
                <div>
                  {user.apr}
                </div>
              </div>
            </div>
          </Link>
        )
      }
      )}
    </div>
  )
}
