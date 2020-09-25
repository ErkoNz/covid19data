import React, { useState, useReducer, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaSortAmountDown } from 'react-icons/fa';
import PrvyRiadokTabulky from './PrvyRiadokTabulky';
import FormatNumber from './components/FormatNumber'
import './css/TabulkaSvet.css'
import './css/covidMainTable.scss'
import LoadingAnimation from './components/LoadingAnimation';


function SvetTabulka(props) {
    const [ikonka, setIkonka] = useState('cases')
    const [kontinent, setKontinent] = useState("Svet")
    const [scrollPerformance, setScrollPerformance] = useState(false)
    // const [LastDayData, setLastDayData] = useState()
    const [style4Buttons, setStyle4Buttons] = useState({
        Svet: { background: '#e5e5e5', boxShadow: 'inset 0px 0px 5px #c1c1c1' },
        Europe: null,
        V4: null,
        North_America: null,
        Asia: null,
        South_America: null,
        Africa: null,
        Australia_Oceania: null,
    })

    const pomForStyleButtons = {
        Svet: null,
        Europe: null,
        V4: null,
        North_America: null,
        Asia: null,
        South_America: null,
        Africa: null,
        Australia_Oceania: null,
    }
    const constStyleforButtons = {
        background: '#e5e5e5',
        // background: 'rgb(216, 216, 216)',
        boxShadow: 'inset 0px 0px 5px rgb(179, 179, 179)',
        // transform: "translate(1px,2px)",
        // fontWeight: 'bold'
        // color: 'white'
    }
    // const [dispatch] = useReducer(reducer, 1);
    const [state, dispatch] = useReducer(reducer, 1);

    useEffect(() => {
        const allowed = ["country", "active", "todayCases", "cases", "deaths", "recovered", "tests"]
        let pom = []
        // console.log(props.countriesData)
        props.countriesData.map((udaj, id) => {
            Object.keys(udaj)
                .filter(key => allowed.includes(key))
                .reduce((obj, key) => {
                    obj[key] = udaj[key];
                    pom[id] = obj
                    return obj;

                }, {})
            return null
        })
        // setLastDayData(pom)
    }, [props.countriesData])

    function reducer(state, action) {
        switch (action.type) {
            case 'Svet':
                setKontinent("Svet")
                return (setStyle4Buttons(prevState => {
                    return { ...pomForStyleButtons, Svet: constStyleforButtons }
                }))
            case 'Europe':
                setKontinent("Europe")
                return (setStyle4Buttons(prevState => {
                    return { ...pomForStyleButtons, Europe: constStyleforButtons }
                }))
            case 'V4':
                setKontinent("V4")
                return (setStyle4Buttons(prevState => {
                    return { ...pomForStyleButtons, V4: constStyleforButtons }
                }))
            case 'North America':
                setKontinent("North America")
                return (setStyle4Buttons(prevState => {
                    return { ...pomForStyleButtons, North_America: constStyleforButtons }
                }))
            case 'Asia':
                setKontinent("Asia")
                return (setStyle4Buttons(prevState => {
                    return { ...pomForStyleButtons, Asia: constStyleforButtons }
                }))
            case 'South America':
                setKontinent("South America")
                return (setStyle4Buttons(prevState => {
                    return { ...pomForStyleButtons, South_America: constStyleforButtons }
                }))
            case 'Africa':
                setKontinent("Africa")
                return (setStyle4Buttons(prevState => {
                    return { ...pomForStyleButtons, Africa: constStyleforButtons }
                }))
            case 'Australia/Oceania':
                setKontinent("Australia/Oceania")
                return (setStyle4Buttons(prevState => {
                    return { ...pomForStyleButtons, Australia_Oceania: constStyleforButtons }
                }))


            default:
                throw new Error();
        }
    }



    function zmenIkonku(key) {
        if (key === ikonka) {
            setIkonka(key + "2")
        }
        else { setIkonka(key) }
    }

    const myStyle2 = {
        transform: "rotateX(180deg)",
    }

    const myFunction = () => {
        var input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("myInput");
        filter = input.value.toUpperCase();
        table = document.getElementById("myTable");
        tr = table.getElementsByTagName("tr");
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[0];
            if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }

    window.addEventListener('scroll', function () {
        if (document.querySelector('.scrollingSvet')) {
            if (document.querySelector('.scrollingSvet').getBoundingClientRect().y < 170)
                setScrollPerformance(true)
        }
    });

    const greenBackgroundforTR = (active) => {
        if (active)
            return null
        else
            return ({ background: 'rgb(190, 245, 204)' })
    }

    // function LastDataFunction(propCountry) {
    // console.log(props.mainData[0].tests)
    // console.log(LastDayData)
    // if (LastDayData)
    // LastDayData.filter(function (e) {
    //     return e.country === propCountry
    // })
    // console.log(LastDayData)
    // }
    return (
        ikonka && kontinent && props ?
            <>
                <input type="text" id="myInput" onKeyUp={myFunction} placeholder="Hľadať.." className="inputSearch" />
                <div className="kontinenty">
                    <button onClick={() => dispatch({ type: 'Svet' })} style={style4Buttons.Svet}>
                        Svet
                    </button>
                    <button onClick={() => dispatch({ type: 'Europe' })} style={style4Buttons.Europe}>
                        Európa
                    </button>
                    <button onClick={() => dispatch({ type: 'V4' })} style={style4Buttons.V4}>
                        V4
                    </button>
                    <button onClick={() => dispatch({ type: 'North America' })} style={style4Buttons.North_America}>
                        Severná Amerika
                    </button>
                    <button onClick={() => dispatch({ type: 'Asia' })} style={style4Buttons.Asia}>
                        Ázia
                    </button>
                    <button onClick={() => dispatch({ type: 'South America' })} style={style4Buttons.South_America}>
                        Južná Amerika
                    </button>
                    <button onClick={() => dispatch({ type: 'Africa' })} style={style4Buttons.Africa}>
                        Afrika
                    </button>
                    <button onClick={() => dispatch({ type: 'Australia/Oceania' })} style={style4Buttons.Australia_Oceania}>
                        Austrália/Oceánia
                    </button>

                </div>
                <div className="divTable" >
                    <table id="myTable">
                        <thead>
                            <tr>
                                <th onClick={() => (props.sortBy("tests") || zmenIkonku("tests"))} >
                                    Krajina
                                    {ikonka === "tests"
                                        ? <FaSortAmountDown className="sortIcon" />
                                        : null
                                    }
                                    {ikonka === "tests2"
                                        ? <FaSortAmountDown style={myStyle2} className="sortIcon" />
                                        : null
                                    }
                                    <div className="firstCase" style={{ fontWeight: 'normal' }}>Počet testov</div>

                                </th>
                                <th onClick={() => (props.sortBy('cases') || zmenIkonku('cases'))} >
                                    Počet nakazených
                            {ikonka === "cases"
                                        ? <FaSortAmountDown className="sortIcon" />
                                        : null
                                    }
                                    {ikonka === "cases2"
                                        ? <FaSortAmountDown style={myStyle2} className="sortIcon" />
                                        : null
                                    }
                                </th>
                                <th onClick={() => (props.sortBy("active") || zmenIkonku("active"))} >
                                    Aktívne prípady
                            {ikonka === "active"
                                        ? <FaSortAmountDown className="sortIcon" />
                                        : null
                                    }
                                    {ikonka === "active2"
                                        ? <FaSortAmountDown style={myStyle2} className="sortIcon" />
                                        : null
                                    }
                                </th>
                                <th onClick={() => (props.sortBy("todayCases") || zmenIkonku("todayCases"))} >
                                    Nové prípady
                            {ikonka === "todayCases"
                                        ? <FaSortAmountDown className="sortIcon" />
                                        : null
                                    }
                                    {ikonka === "todayCases2"
                                        ? <FaSortAmountDown style={myStyle2} className="sortIcon" />
                                        : null
                                    }
                                </th>
                                <th onClick={() => (props.sortBy("deaths") || zmenIkonku("deaths"))} >
                                    Počet úmrtí
                            {ikonka === "deaths"
                                        ? <FaSortAmountDown className="sortIcon" />
                                        : null
                                    }
                                    {ikonka === "deaths2"
                                        ? <FaSortAmountDown style={myStyle2} className="sortIcon" />
                                        : null
                                    }
                                </th>
                                <th onClick={() => (props.sortBy("todayDeaths") || zmenIkonku("todayDeaths"))} >
                                    Nové úmrtia
                            {ikonka === "todayDeaths"
                                        ? <FaSortAmountDown className="sortIcon" />
                                        : null
                                    }
                                    {ikonka === "todayDeaths2"
                                        ? <FaSortAmountDown style={myStyle2} className="sortIcon" />
                                        : null
                                    }
                                </th>
                                <th onClick={() => (props.sortBy("recovered") || zmenIkonku("recovered"))} >
                                    Počet vyliečených
                            {ikonka === "recovered"
                                        ? <FaSortAmountDown className="sortIcon" />
                                        : null
                                    }
                                    {ikonka === "recovered2"
                                        ? <FaSortAmountDown style={myStyle2} className="sortIcon" />
                                        : null
                                    }
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <PrvyRiadokTabulky kontinent={kontinent} mainData={props.mainData} />
                            {/* {console.log(props.mainData[0].tests)} */}
                            {kontinent === "Svet" ?
                                <>
                                    {props.countriesData.map((item, id) => (
                                        scrollPerformance || id < 20 ?
                                            <tr className="scrollingSvet" key={id} style={greenBackgroundforTR(item.active)}>
                                                <td style={{ width: '100px' }}>
                                                    {item.country === "Slovakia" ?
                                                        <Link to="/Covid/CovidSK">
                                                            <span className="KrajinaLink" >{item.country}</span>
                                                            {item.tests > 0 ?
                                                                <div className="firstCase">
                                                                    <div className="firstCaseNumber">
                                                                        <FormatNumber prop={item.tests} />
                                                                    </div>
                                                                </div>
                                                                : null}
                                                        </Link>
                                                        :
                                                        <Link to={{
                                                            // state: LastDataFunction(item.country), pathname: `/Covid/CovidApp/${item.country}`
                                                            state: props.mainData[0].tests, pathname: `/Covid/CovidApp/${item.country}`
                                                        }}>
                                                            <span className="KrajinaLink" >{item.country}</span>
                                                            {item.tests > 0 ?
                                                                <div className="firstCase">
                                                                    <div className="firstCaseNumber">
                                                                        <FormatNumber prop={item.tests} />
                                                                    </div>
                                                                </div>
                                                                : null}
                                                        </Link>
                                                    }

                                                </td>
                                                <td><FormatNumber prop={item.cases} /></td>
                                                <td>{item.active ? <FormatNumber prop={item.active} /> : "0"}</td>

                                                {item.todayCases > 0 ?
                                                    <td style={{ background: ' rgb(254, 255, 194)' }}>+<FormatNumber prop={item.todayCases} /> </td>
                                                    : <td></td>
                                                }
                                                <td><FormatNumber prop={item.deaths} /></td>
                                                {item.todayDeaths > 0 ?
                                                    <td style={{ color: ' rgba(156, 20, 20, 0.849)', fontWeight: 'bold' }}>+<FormatNumber prop={item.todayDeaths} /> </td>
                                                    : <td></td>
                                                }
                                                <td style={{ fontWeight: 'bold', color: '#006600' }}><FormatNumber prop={item.recovered} /></td>
                                            </tr>
                                            : null
                                    ))
                                    }
                                </>

                                : kontinent === "V4" ?
                                    <>
                                        {props.countriesData.map((item, id) => (
                                            item.country === "Slovakia"
                                                || item.country === "Czechia"
                                                || item.country === "Hungary"
                                                || item.country === "Poland"
                                                || item.country === "Austria"
                                                || item.country === "Ukraine" ?

                                                <tr className="scrollingSvet" key={id} style={greenBackgroundforTR(item.active)}>
                                                    {/* {console.log(item.country)} */}

                                                    <td style={{ width: '100px' }}>
                                                        {item.country === "Slovakia" ?
                                                            <Link to="/Covid/CovidSK" >

                                                                <span className="KrajinaLink" >{item.country}</span>
                                                                {item.tests > 0 ?
                                                                    <div className="firstCase">
                                                                        <div className="firstCaseNumber">
                                                                            <FormatNumber prop={item.tests} />
                                                                        </div>
                                                                    </div>
                                                                    : null}
                                                            </Link>
                                                            :

                                                            <Link to={{
                                                                // state: LastDataFunction(item.country), pathname: `/Covid/CovidApp/${item.country}`
                                                                state: props.mainData[0].tests, pathname: `/Covid/CovidApp/${item.country}`
                                                            }}>
                                                                <span className="KrajinaLink" >{item.country}</span>

                                                                {item.tests > 0 ?
                                                                    <div className="firstCase">
                                                                        <div className="firstCaseNumber">
                                                                            <FormatNumber prop={item.tests} />
                                                                        </div>
                                                                    </div>
                                                                    : null}
                                                            </Link>

                                                        }


                                                    </td>
                                                    <td><FormatNumber prop={item.cases} /></td>
                                                    <td>{item.active ? <FormatNumber prop={item.active} /> : "0"}</td>

                                                    {item.todayCases > 0 ?
                                                        <td style={{ background: ' rgb(254, 255, 194)' }}>+<FormatNumber prop={item.todayCases} /> </td>
                                                        : <td></td>
                                                    }
                                                    <td><FormatNumber prop={item.deaths} /></td>
                                                    {item.todayDeaths > 0 ?
                                                        <td style={{ color: ' rgba(156, 20, 20, 0.849)', fontWeight: 'bold' }}>+<FormatNumber prop={item.todayDeaths} /> </td>
                                                        : <td></td>
                                                    }
                                                    <td style={{ fontWeight: 'bold', color: '#006600' }}><FormatNumber prop={item.recovered} /></td>
                                                </tr>
                                                : null
                                        ))
                                        }
                                    </>

                                    :
                                    props.countriesData.map((item, id) => (
                                        item.continent === kontinent ?
                                            <tr key={id} style={greenBackgroundforTR(item.active)}>
                                                <td style={{ width: '100px' }}>
                                                    {item.country === "Slovakia" ?
                                                        <Link to="/Covid/CovidSK">
                                                            <span className="KrajinaLink" >{item.country}</span>
                                                            {item.tests > 0 ?
                                                                <div className="firstCase">
                                                                    <div className="firstCaseNumber">
                                                                        <FormatNumber prop={item.tests} />
                                                                    </div>
                                                                </div>
                                                                : null}
                                                        </Link>
                                                        :
                                                        <Link to={{
                                                            // state: LastDataFunction(item.country), pathname: `/Covid/CovidApp/${item.country}`
                                                            state: props.mainData[0].tests, pathname: `/Covid/CovidApp/${item.country}`
                                                        }}>
                                                            <span className="KrajinaLink" >{item.country}</span>
                                                            {item.tests > 0 ?
                                                                <div className="firstCase">
                                                                    <div className="firstCaseNumber">
                                                                        <FormatNumber prop={item.tests} />
                                                                    </div>
                                                                </div>
                                                                : null}
                                                        </Link>
                                                    }

                                                </td>
                                                <td><FormatNumber prop={item.cases} /></td>
                                                <td>{item.active ? <FormatNumber prop={item.active} /> : "0"}</td>
                                                {item.todayCases > 0 ?
                                                    <td style={{ background: ' rgb(254, 255, 194)' }}>+<FormatNumber prop={item.todayCases} /> </td>
                                                    : <td></td>
                                                }
                                                <td><FormatNumber prop={item.deaths} /></td>
                                                {item.todayDeaths > 0 ?
                                                    <td style={{ color: ' rgba(156, 20, 20, 0.849)', fontWeight: 'bold' }}>+<FormatNumber prop={item.todayDeaths} /> </td>
                                                    : <td></td>
                                                }
                                                <td style={{ fontWeight: 'bold', color: 'green' }}><FormatNumber prop={item.recovered} /></td>
                                            </tr>
                                            : null
                                    ))
                            }
                        </tbody>
                    </table>
                    <label htmlFor="myInput">.</label>
                </div>
            </>
            : null
    )
}

export default SvetTabulka