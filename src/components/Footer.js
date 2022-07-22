import React from 'react'
import Discord from '../assets/images/discord.svg'

function Footer() {
    return (
        <div style={{paddingBottom: '50px', display: 'flex', gap: '20px'}}>
            <img src={Discord} alt="" width="50" height="50"/>
        </div>
    )
}

export default Footer
