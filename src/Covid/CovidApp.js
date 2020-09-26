import React, { useState, useEffect } from 'react'
import './css/covid.css'
// import './css/covidDesign.css'
import { Link } from 'react-router-dom'
import SvetTabulka from "./SvetTabulka"
import { AiOutlineDoubleRight } from "react-icons/ai";
// import DougnatChart from "./DougnatChart"
import DataWorld from './components/DataWorld'
import LoadingAnimation from './components/LoadingAnimation';

function CovidApp() {
    const [mainData, setMainData] = useState()
    const [doughnatData, setDoughnatData] = useState()
    const [countriesData, setCountriesData] = useState()
    const [state, setState] = useState({
        countriesData: countriesData,
        direction: {
            price_usd: 'asc',
        }
    })

    useEffect(() => {
        const fetchData = async () => {
            const response1 = await fetch('https://disease.sh/v2/all')
            let data1 = await response1.json()
            setDoughnatData([data1.cases, data1.recovered, data1.deaths])
            setMainData([data1])

            const response = await fetch('https://disease.sh/v2/countries')
            let data = await response.json()
            setCountriesData(data)
            setState({
                data: data.sort((a, b) => (
                    state.direction['cases'] === 'asc'
                        ? parseFloat(a['cases']) - parseFloat(b['cases'])
                        : parseFloat(b['cases']) - parseFloat(a['cases'])
                )),
                direction: {
                    'cases': state.direction['cases'] === 'asc'
                        ? 'desc'
                        : 'asc'
                }
            })
        }
        fetchData()
    }, [])

    function sortBy(key) {
        setState({
            countriesData: countriesData.sort((a, b) => (
                state.direction[key] === 'asc'
                    ? parseFloat(a[key]) - parseFloat(b[key])
                    : parseFloat(b[key]) - parseFloat(a[key])
            )),
            direction: {
                [key]: state.direction[key] === 'asc'
                    ? 'desc'
                    : 'asc'
            }
        })
    }


    return (
        mainData && doughnatData && countriesData && (state.direction['cases'] || state.direction['tests']
            || state.direction['active']
            || state.direction['todayCases']
            || state.direction['deaths']
            || state.direction['recovered']
            || state.direction['todayDeaths']) ?
            <div className="covidApp">
                <DataWorld mainData={mainData} />
                <br></br>
                <br></br>
                <div className="SlovenskeUdajeLink" >
                    <Link to='/Covid/CovidSK'>Slovenské údaje <AiOutlineDoubleRight className="iconSlovUdaje" />
                    </Link>
                </div>
                <br></br>
                <div className="SlovenskeUdajeLink" >
                    <Link to={`/Covid/CovidApp/Svet`} >Grafy pre celý svet <AiOutlineDoubleRight className="iconSlovUdaje" />
                    </Link>
                </div>
                <br></br><br></br>
                <SvetTabulka countriesData={countriesData} mainData={mainData} sortBy={sortBy} />
            </div >
            : <LoadingAnimation />


    )
}

export default CovidApp
