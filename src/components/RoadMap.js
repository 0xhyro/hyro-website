import React from 'react'
import "../styles/roadmap.scss"
import { useMediaQuery } from "react-responsive";
import "../index.scss"

function RoadMap() {
    const isMobile = useMediaQuery({ maxWidth: 890 })

    return (
        <div>
            <ul className={isMobile ? "timeline recadre" : "timeline"} >
                <li className={isMobile ? "small-text" : undefined}>Restricted discord Opening</li>
                <li className={isMobile ? "small-text" : undefined}>Mint</li>
                <li className={isMobile ? "small-text" : undefined}>Discord Members-only hub Opening</li>
                <li className={isMobile ? "small-text" : undefined}>Collaborate to Earn system development</li>
            </ul>
        </div>
    )
}

export default RoadMap
