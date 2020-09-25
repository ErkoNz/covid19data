import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
// import './nav.css'
import './Covid/css/nav.scss'
import earthIcon from "./imgs/earth.svg"
import slovakiaIcon from "./imgs/slovakiaIcon.svg"

function Nav() {
    const [state, setState] = useState()
    let navStyle = {
        color: 'white',
    }
    useEffect(() => {
        const LoadData = async () => {
            const response = await fetch('https://mapa.covid.chat/map_data')
            const data = await response.json()

            setState(data.tested_chart[data.tested_chart.length - 1])
        }
        LoadData()
    }, [])


    const PocPripadov = () => {
        if (state) {
            let sklnovaniePripadov = "prípadov"
            if (state.day === 1)
                sklnovaniePripadov = "prípad"
            else if (state.infected > 1 && state.infected < 5)
                sklnovaniePripadov = "prípady"

            return (
                <div>{state.day}: <span>{state.infected}</span> {sklnovaniePripadov}</div>
            )
        }
        else return null
    }

    // function doubleClickFC() {
    //     window.location.href = "#/Todo"
    // }

    return (
        <nav className="navApp" >
            <ul className="navLinks">
                <li>
                    <Link style={navStyle} to='/Covid/CovidApp'>
                        <div>
                            <img alt="" src={earthIcon} className="earthIcon" />Covid vo svete
                        </div>
                    </Link>
                </li>
                <li>
                    <Link style={navStyle} to='/Covid/CovidSK'>
                        <div>
                            <img alt="" src={slovakiaIcon} className="svkIcon" />Covid na Slovensku
                           <div className="novePripady">
                                {PocPripadov()}
                            </div>
                        </div>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default Nav
