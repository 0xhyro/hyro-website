import NavBar from '../components/Navbar'
import Users from '../store/users.json'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import Loupe from '../assets/images/loupe.png'

const getFilteredItems = (query, items) => {
  if (!query) {
    return items;
  }
  return items.filter(item => item.name.includes(query))
}

export default function MainApp() {
  const [query, setQuery] = useState("")
  const filteredItems = getFilteredItems(query, Users)
  return (
    <div className="container">
      <NavBar />
      <div style={{ paddingTop: '30px' }} />
      <div style={{display: 'flex', alignItems: 'center', gap: 10}}>

      <img alt='loupe' src={Loupe} width={25} height={25} />
      <input
        onChange={e => setQuery(e.target.value)}
        type="text"
        id="search"
        name="search"
        placeholder="Search a hyro"
        style={{ padding: '10px', width: '100%', borderRadius: '5px', backgroundColor: '#EAEAEA' }}
        />
        </div>
      <div style={{ paddingTop: '30px' }} />
      <h1 style={{ textAlign: 'center' }}>Hyro Leader board</h1>
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
      {filteredItems.map(user => {
        let pColor = user.apr.charAt(0) === '-' ? 'red' : 'green'
        return (
          <Link exact='true' to={`/${user.id}`} key={user.id} style={{ textDecoration: 'none', color: 'black' }}>
            <div className='row-display-click'>
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
