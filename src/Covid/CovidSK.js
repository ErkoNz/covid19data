import React, { useState, useEffect } from 'react'
import './css/covid.css'
// import TabulkaMesta from "./TabulkaMesta"
import BarGrafSvk from './BarGrafSvk';
import HandleDataSvk from './components/HandleDataSvk';
import FuncSetDataForGraph from './components/FuncSetDataForGraph';
// import DataWorld from './components/DataWorld';
// import { FiBarChart } from 'react-icons/fi'
// import { BiBarChart } from 'react-icons/bi'
import LoadingAnimation from './components/LoadingAnimation';
function CovidSK() {
    const [dataSvk, setDataSvk] = useState()
    const svk = 'https://mapa.covid.chat/map_data'
    const [dataForChart, setDataForChart] = useState()
    const [mainData, setMainData] = useState()

    const [loadMoreData, setLoadMoreData] = useState({
        text: 'Zobraziť viac dní',
        bool: false
    })


    useEffect(() => {
        const LoadDataBegin = async () => {
            const response = await fetch(svk)
            const data = await response.json()
            setMainData([{
                active: data.active,
                cases: data.infected,
                deaths: data.deaths,
                recovered: data.recovered,
                tests: data.tested,
                tested_chart: data.tested_chart,
                chart: data.chart,
                districts: data.districts
            }])
            let datumy = data.chart.map((item, id) => {
                let output = item.date.replace("-", ". ")
                output = output.replace("-", ". ")
                return output
            })
            let dailyCases = data.chart.map((item, id) => {
                return item.infected_daily
            })

            let valueActiveCases = data.chart.map((item, id) => {
                return item.active
            })

            let valuesCases = data.chart.map((item) => {
                return item.infected
            })

            let valueDeaths = data.chart.map((item) => {
                return item.deaths
            })

            let valueRecovered = data.chart.map((item) => {
                return item.recovered
            })

            let valueTest = data.chart.map((item) => {
                return item.tested_daily
            })

            valueTest = valueTest.slice(datumy.length - 32, datumy.length)
            valuesCases = valuesCases.slice(datumy.length - 32, datumy.length)
            valueDeaths = valueDeaths.slice(datumy.length - 32, datumy.length)
            valueRecovered = valueRecovered.slice(datumy.length - 32, datumy.length)
            valueActiveCases = valueActiveCases.slice(datumy.length - 32, datumy.length)
            dailyCases = dailyCases.slice(datumy.length - 32, datumy.length)
            datumy = datumy.slice(datumy.length - 32, datumy.length)

            if (!dataSvk)
                setDataSvk([data])

            FuncSetDataForGraph(setDataForChart, datumy, dailyCases, valueActiveCases, valuesCases, valueDeaths, valueRecovered, valueTest, false)
        }
        LoadDataBegin()
    }, [])


    const LoadDataOnChange = (booleanProp) => {

        let datumy = dataSvk[0].chart.map((item, id) => {
            let output = item.date.replace("-", ". ")
            output = output.replace("-", ". ")
            return output
        })
        let dailyCases = dataSvk[0].chart.map((item) => {
            return item.infected_daily
        })

        let valueActiveCases = dataSvk[0].chart.map((item) => {
            return item.active
        })

        let valuesCases = dataSvk[0].chart.map((item) => {
            return item.infected
        })

        let valueDeaths = dataSvk[0].chart.map((item) => {
            return item.deaths
        })

        let valueRecovered = dataSvk[0].chart.map((item) => {
            return item.recovered
        })

        let valueTest = dataSvk[0].chart.map((item) => {
            return item.tested_daily
        })

        if (!booleanProp) {
            dailyCases = dailyCases.slice(datumy.length - 32, datumy.length)
            valueActiveCases = valueActiveCases.slice(datumy.length - 32, datumy.length)
            valuesCases = valuesCases.slice(datumy.length - 32, datumy.length)
            valueDeaths = valueDeaths.slice(datumy.length - 32, datumy.length)
            valueRecovered = valueRecovered.slice(datumy.length - 32, datumy.length)
            valueTest = valueTest.slice(datumy.length - 32, datumy.length)
            datumy = datumy.slice(datumy.length - 32, datumy.length)
        }

        FuncSetDataForGraph(setDataForChart, datumy, dailyCases, valueActiveCases, valuesCases, valueDeaths, valueRecovered, valueTest, booleanProp)

    }

    // const negatTestyMoje = [83, 102, 50, 42, 120, 129, 118, 197, 228]

    const ZmenitLoadMoreData = () => {
        if (loadMoreData.bool === false) {
            setLoadMoreData({
                text: 'Zobraziť menej dní',
                bool: !loadMoreData.bool
            })

        }
        else {
            setLoadMoreData({
                text: 'Zobraziť viac dní',
                bool: !loadMoreData.bool
            })
        }
        LoadDataOnChange(!loadMoreData.bool)
    }


    return (
        <div className="covidApp">
            {mainData ?
                <>
                    <HandleDataSvk mainData={mainData} />

                    {/* <div className="NacitatViacDniDoGrafov" onClick={() => ZmenitLoadMoreData()}>
                        {loadMoreData.bool ? <FiBarChart className="chartIcon" />
                            : <BiBarChart className="chartIcon" />
                        }
                        {loadMoreData.text}
                    </div> */}

                    {dataForChart &&
                        <div >
                            {/* <BarGrafSvk props={dataForChart} ZmenitLoadMoreData={ZmenitLoadMoreData} loadMoreData={loadMoreData} /> */}
                            <BarGrafSvk props={dataForChart} ZmenitLoadMoreData={ZmenitLoadMoreData} loadMoreData={loadMoreData} />
                        </div>
                    }

                    {/* <br></br><br></br><br></br><br></br> */}
                </>
                : <LoadingAnimation />}
        </div >
    )
}

export default CovidSK
