import NavBar from '../components/Navbar'
import Users from '../store/users.json'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import Loupe from '../assets/images/loupe.png'
import axios from 'axios'
import { POH_THE_GRAPH } from '../store/constant'
import NatPic from '../assets/images/anti.jpeg'

const getFilteredItems = (query, items) => {
  if (!query) {
    return items;
  }
  return items.filter(item => item.name.includes(query))
}

export default function MainApp() {
  const [query, setQuery] = useState("")
  const filteredItems = getFilteredItems(query, Users)
  const [meta, setMeta] = useState()

  useEffect(() => {
    axios.post(POH_THE_GRAPH, {
      query: `
      {
        submissions(where : {id: "0xc043d71f7455f9e8b65bc037e9252f6fd83849ef"}) {
          id
          name
          requests {
            evidence(orderBy: creationTime, first: 1) {
              URI
            }
          }
        }
      }
  `
    }).then((res) => {
      setMeta(res.data.data.submissions[0])
    })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  return (
    <div className="container">
      <NavBar />
      <div style={{ paddingTop: '30px' }} />
      <h1 style={{ textAlign: 'center', fontSize: '4em' }}>Welcome to Hyro</h1>
      <h3 style={{ textAlign: 'center' }}>From <span style={{ fontFamily: 'bold', color: '#6e6e6e' }}>Zyro</span> to <span style={{ fontFamily: 'bold' }}>Hyro</span>.</h3>
      <div style={{ paddingTop: '30px' }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <img alt='loupe' src={Loupe} width={25} height={25} />
        <input
          onChange={e => setQuery(e.target.value)}
          type="text"
          id="search"
          name="search"
          placeholder="Search your Hyro"
          style={{ padding: '10px', width: '100%', borderRadius: '5px', backgroundColor: '#FFF' }}
        />
      </div>
      <div style={{ paddingTop: '30px' }} />
      <h1 style={{ textAlign: 'center' }}>Hyro Leader board</h1>
      <div style={{ boxShadow: '5px 5px 5px #D9D9D9', borderRadius: '15px', padding: '10px', display: 'flex', gap: 20, justifyContent: 'space-between', alignItems: 'center', fontWeight: 700, fontSize: "1.5em", backgroundColor: '#eaeaea' }}>
        <div style={{ width: '25%', textAlign: 'center' }}>
          User
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
      {/* NATHAN */}
      <Link exact='true' to={`/4`} style={{ textDecoration: 'none', color: 'black' }}>
      <div className='row-display-click'>
        <div style={{ width: '25%', textAlign: 'center' }}>
          <img style={{ borderRadius: '50%' }} alt='logo' src={NatPic} width={50} height={50} />
        </div>
        <div style={{ width: '25%', textAlign: 'center' }}>
          {meta?.name}
        </div>
        <div style={{ width: '25%', textAlign: 'center' }}>
          $0
        </div>
        <div style={{ width: '25%', textAlign: 'center' }}>
          0
        </div>
      </div>
      </Link>

      {/* FIN NATHAN */}
      {filteredItems.map(user => {
        let pColor = user.apr.charAt(0) === '-' ? 'red' : 'green'
        return (
          <Link exact='true' to={`/${user.id}`} key={user.id} style={{ textDecoration: 'none', color: 'black' }}>
            <div className='row-display-click'>
              <div style={{ width: '25%', textAlign: 'center' }}>
                <img style={{ borderRadius: '50%' }} alt='logo' src={user?.logo} width={50} height={50} />
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
      <div style={{ paddingTop: '30px' }} />
    </div>
  )
}
