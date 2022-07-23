import React, { useEffect, useState } from 'react'
import NavBar from '../components/Navbar'
import Users from '../store/users.json'
import { Link } from 'react-router-dom'

export default function MainApp() {
  const [color, setColor] = useState("")


  // const redOrGreen = (word) => {
  //   word.charAt(0) === '-' ? setColor('red') : setColor('green')
  //   console.log(color)
  //   return (
  //     <div >
  //       {word}
  //     </div>
  //   )
  // }
  return (
    <div className="container">
      <NavBar />
      <div style={{ paddingTop: '30px' }} />
      <input type="text" id="search" name="search" placeholder="Search" style={{ padding: '10px', width: '100%', borderRadius: '5px', backgroundColor: '#EAEAEA' }} />
      <div style={{ paddingTop: '30px' }} />
      <div style={{ borderBottom: '1px solid', padding: '10px', display: 'flex', gap: 20, justifyContent: 'space-between', fontWeight: 700, fontSize: "1.5em" }}>
        <div style={{ width: '25%', textAlign: 'center' }}>
          Id
        </div>
        <div style={{ width: '25%', textAlign: 'center' }}>
          Name
        </div>
        <div style={{ width: '25%', textAlign: 'center' }}>
          Invested
        </div>
        <div style={{ width: '25%', textAlign: 'center' }}>
          APR
        </div>
      </div>
      {Users.map(user => {
        let pColor = user.apr.charAt(0) === '-' ? 'red' : 'green'
        return (
          <Link exact='true' to={`/${user.id}`} key={user.id} style={{ textDecoration: 'none', color: 'black' }}>
            <div style={{ borderBottom: '1px solid', padding: '10px', display: 'flex', gap: 20, justifyContent: 'space-between', cursor: 'pointer' }}>
              <div style={{ width: '25%', textAlign: 'center' }}>
                {user.id + 1}
              </div>
              <div style={{ width: '25%', textAlign: 'center' }}>
                {user.name}
              </div>
              <div style={{ width: '25%', textAlign: 'center' }}>
                {user.invested}
              </div>
              <div style={{ color: pColor, width: '25%', textAlign: 'center' }}>
                {user.apr}
              </div>
            </div>
          </Link>
        )
      }
      )}
    </div>
  )
}
