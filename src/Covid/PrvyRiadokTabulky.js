import React, { useState, useEffect } from 'react'
import axios from 'axios'
import FormatNumber from './components/FormatNumber'
import { IoIosArrowUp } from 'react-icons/io';

function PrvyRiadokTabulky(props) {
    // console.log(props)
    const [dataKontinenty, setDataKontinenty] = useState()
    const [doTabulkyPrvyRiadok, setDoTabulkyPrvyRiadok] = useState()
    const [sipkyDole, setSipkyDole] = useState(true)
    const [sipkaKontinenty, setSipkaKontinenty] = useState({
        transition: 'all .2s ease-in',
        position: 'absolute',
        marginTop: '2px',
        marginLeft: '2px'
    })
    const [styleForRollDown, setStyleForRollDown] = useState({
        position: 'absolute',
        left: '-1000px',
        transition: 'all .2s ease-in',
        // fontSize: '15px',
    })

    useEffect(() => {
        axios.get(`https://disease.sh/v2/continents`)
            .then(res => {
                setDataKontinenty([res.data])
            })

        // if (dataKontinenty) {
        //     let result = dataKontinenty[0].filter(obj => {
        //         return obj.continent === props.kontinent
        //     })
        //     setDoTabulkyPrvyRiadok(result[0])
        // }
    }, [props.kontinent])


    useEffect(() => {
        if (dataKontinenty) {
            let result = dataKontinenty[0].filter(obj => {
                return obj.continent === props.kontinent
            })
            setDoTabulkyPrvyRiadok(result[0])
        }
    }, [dataKontinenty, props.kontinent])



    const rollDownContintinents = () => {
        setSipkyDole(!sipkyDole)
        if (sipkyDole) {
            setSipkaKontinenty({
                transform: "rotate(180deg)",
                transition: 'all .2s ease-in',
                position: 'absolute',
                marginTop: '2px',
                marginLeft: '2px'
            })
            setStyleForRollDown({
                // background: 'rgb(234, 234, 234)',
                // fontSize: '15px',
                transition: 'all .2s ease-in',
            })
        }
        else {
            setStyleForRollDown({
                position: 'absolute',
                left: '-1000px',
                transition: 'all .2s ease-in',
                // fontSize: '15px',
            })

            setSipkaKontinenty({
                transform: "rotate(0deg)",
                transition: 'all .2s ease-in',
                position: 'absolute',
                marginTop: '2px',
                marginLeft: '2px'
            })
        }
    }

    return (
        styleForRollDown && dataKontinenty && sipkaKontinenty && styleForRollDown && props.mainData && props ?
            <>
                {props.kontinent === "Svet" ?
                    <>
                        <tr key={-1} style={{ background: 'rgb(234, 234, 234)' }} >
                            <td onClick={rollDownContintinents}>
                                <span className="spanJustHoverPointer" >Celý Svet <IoIosArrowUp style={sipkaKontinenty} />
                                    <div className="firstCase">
                                        <div className="firstCaseNumber"><FormatNumber prop={props.mainData[0].tests} />
                                        </div>
                                    </div>
                                </span>
                            </td>
                            <td><FormatNumber prop={props.mainData[0].cases} /></td>
                            <td><FormatNumber prop={props.mainData[0].active} /></td>
                            <td style={{ background: 'rgba(254, 255, 194, .4)' }}>+<FormatNumber prop={props.mainData[0].todayCases} /></td>
                            <td><FormatNumber prop={props.mainData[0].deaths} /></td>
                            <td style={{ color: ' rgba(156, 20, 20, 0.849)', fontWeight: 'bold' }}>+<FormatNumber prop={props.mainData[0].todayDeaths} /></td>
                            <td style={{ fontWeight: 'bold', color: '#006600' }}><FormatNumber prop={props.mainData[0].recovered} /></td>
                        </tr>
                        {
                            dataKontinenty[0].map((oneKontinent, id) => (
                                <tr key={id} className="zrolovaneKontinenty" style={styleForRollDown} >
                                    <td style={{ width: '100px' }}>
                                        {oneKontinent.continent}
                                        <div className="firstCase"><div className="firstCaseNumber"><FormatNumber prop={oneKontinent.tests} /></div></div>
                                    </td>
                                    <td><FormatNumber prop={oneKontinent.cases} /></td>
                                    <td><FormatNumber prop={oneKontinent.active} /></td>
                                    <td style={{}}>+<FormatNumber prop={oneKontinent.todayCases} /></td>
                                    <td><FormatNumber prop={oneKontinent.deaths} /></td>
                                    <td style={{ color: ' rgba(156, 20, 20, 0.849)', fontWeight: 'bold' }}>+<FormatNumber prop={oneKontinent.todayDeaths} /></td>
                                    <td style={{ fontWeight: 'bold', color: '#006600' }}><FormatNumber prop={oneKontinent.recovered} /></td>
                                </tr>
                            ))
                        }
                    </>
                    :
                    <>
                        {doTabulkyPrvyRiadok ?
                            <tr key={-10} style={{ background: 'rgb(234, 234, 234)' }} >
                                <td style={{ width: '100px' }}>
                                    {doTabulkyPrvyRiadok.continent}
                                    <div className="firstCase"><div className="firstCaseNumber"><FormatNumber prop={doTabulkyPrvyRiadok.tests} /></div></div>
                                </td>
                                <td><FormatNumber prop={doTabulkyPrvyRiadok.cases} /></td>
                                <td><FormatNumber prop={doTabulkyPrvyRiadok.active} /></td>
                                <td style={{}}>+<FormatNumber prop={doTabulkyPrvyRiadok.todayCases} /></td>
                                <td><FormatNumber prop={doTabulkyPrvyRiadok.deaths} /></td>
                                <td style={{ color: ' rgba(156, 20, 20, 0.849)', fontWeight: 'bold' }}>+<FormatNumber prop={doTabulkyPrvyRiadok.todayDeaths} /></td>
                                <td style={{ fontWeight: 'bold', color: '#006600' }}><FormatNumber prop={doTabulkyPrvyRiadok.recovered} /></td>
                            </tr>
                            : null}
                    </>
                }
            </>
            : null
    )
}

export default PrvyRiadokTabulky
