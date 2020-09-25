import React from 'react'
import FormatNumber from './FormatNumber'
// import '../css/dataSlovakia.scss'
import { GiDeathSkull } from "react-icons/gi";
import { FaPlusCircle } from "react-icons/fa";
import { RiVirusLine } from "react-icons/ri";
import TabulkaMesta from '../TabulkaMesta';

function HandleDataSvk({ mainData }) {

    function GetLastData(prop) {
        // if (prop === "tests") {
        //     let a = mainData[0].tested_chart[Object.keys(mainData[0].tested_chart).length - 1].tested
        //     let b = mainData[0].tested_chart[Object.keys(mainData[0].tested_chart).length - 1].infected
        //     // if ((a - b) > 0)
        //     return <>Počet negatívnych testov <span className="negatTested">{a - b}</span></>
        // }
         if (prop === "recovered") {
            let a = mainData[0].chart[Object.keys(mainData[0].tested_chart).length].recovered
            let b = mainData[0].chart[Object.keys(mainData[0].tested_chart).length - 1].recovered
            // if ((a - b) > 0)
            // return <>Počet nových vyliečených <span className="newRecovered">+{a - b}</span></>
            return a - b
        }
        else if (prop === "deaths") {
            let a = mainData[0].chart[Object.keys(mainData[0].tested_chart).length].deaths
            let b = mainData[0].chart[Object.keys(mainData[0].tested_chart).length - 1].deaths
            if ((a - b) > 0)
                return a - b
        }
        else if (prop==="recovered2"){
            let a = mainData[0].chart[Object.keys(mainData[0].tested_chart).length].recovered
            let b = mainData[0].chart[Object.keys(mainData[0].tested_chart).length - 1].recovered
            // if ((a - b) > 0)
            return a - b
        }

    }

    // function GetTodayDeaths() {
    //     let a = mainData[0].chart[Object.keys(mainData[0].tested_chart).length].deaths
    //     let b = mainData[0].chart[Object.keys(mainData[0].tested_chart).length - 1].deaths
    //     // return "Počet nových úmrtí: " + <span>c</span>
    //     // return "Počet nových úmrtí: " && <div>c</div>
    //     if ((a - b) > 0)
    //         return (
    //             <>Počet nových úmrtí: <span>{a - b}</span></>
    //         )
    // }
    // a = mainData[0].chart[Object.keys(mainData[0].tested_chart).length].deaths
    // b = mainData[0].chart[Object.keys(mainData[0].tested_chart).length - 1].deaths
    // c = a - b
    // let newDeaths = 0
    // if (c > 0) {
    //     newDeaths = a - b
    // }


    const GetTheDay = () => {
        const lastDay = mainData[0].tested_chart[Object.keys(mainData[0].tested_chart).length - 1].day
        if (lastDay === "Pondelok")
            return "pondelok"
        else if (lastDay === "Utorok")
            return "utorok"
        else if (lastDay === "Streda")
            return "stredu"
        else if (lastDay === "Štvrtok")
            return "štvrtok"
        else if (lastDay === "Piatok")
            return "piatok"
        else if (lastDay === "Sobota")
            return "sobotu"
        else return "nedeľu"

    }

    function numberTrans3(a, b) {
        if (a) {
            let output = b / (a / 100)
            output = b / (a / 100)
            output = output.toFixed(3)
            output = output.toString()
            output = output.replace(".", ",")
            return (
                <div className="aktiveNakazenych">
                    V percentách: <span>{output}%</span>
                </div >
            )
        }
    }
    return (
        <>
            <div className="cardsDivNew">
                <div className="cardsNew">
                    <div className="iconInCard cases">
                        <RiVirusLine />
                    </div>
                    <div className="upperText">Počet nakazených
                    
                    </div>
                    <div className="mainText cases">
                        <FormatNumber prop={mainData[0].cases} />
                        <span className="plusInfected">+{mainData[0].tested_chart[Object.keys(mainData[0].tested_chart).length - 1].infected}</span>
                    </div>
                    <div className="underText">
                        Počet aktívnych prípadov:    <span><FormatNumber prop={mainData[0].active} /></span><br />
                    Počet testov:    <span><FormatNumber prop={mainData[0].tests} /></span>
                    </div>
                </div>

                <div className="cardsNew">
                    <div className="iconInCard recovered">
                        <FaPlusCircle />
                    </div>
                    <div className="upperText">Počet vyliečených</div>
                    <div className="mainText recovered">
                        <FormatNumber prop={mainData[0].recovered} />
                        <span className="plusRecovered">+{GetLastData("recovered2")}</span>

                    </div>
                    <div className="underText">
                        {numberTrans3(mainData[0].cases, mainData[0].recovered)}
                    </div>
                </div>


                <div className="cardsNew">
                    <div className="iconInCard deaths">
                        <GiDeathSkull />
                    </div>
                    <div className="upperText">Počet úmrtí</div>
                    <div className="mainText deaths">
                        <FormatNumber prop={mainData[0].deaths} />
                        {
                            GetLastData("deaths") > 0 ?
                                <span className="plusDeaths">+<FormatNumber prop={GetLastData("deaths")} /></span>
                            : null
                        }
                    {/* <span className="plusDeaths">+{GetLastData("deaths")}</span> */}

                    </div>
                    <div className="underText">
                        {numberTrans3(mainData[0].cases, mainData[0].deaths)}
                    </div>
                </div>

            </div>
            <div className="dataFromYesterday">
                <h1>Údaje za {GetTheDay()}</h1>
                <div className="wrapperForGrid">
                    <div>
                        <h6>Počet  nakazených</h6>
                        <span className="newCases">+{mainData[0].tested_chart[Object.keys(mainData[0].tested_chart).length - 1].infected}</span>
                    </div>
                    <div>
                        <h6>Počet  vyliečených </h6>
                        <span className="newRecovered">+{GetLastData("recovered")}</span> 
                    </div>
                    <div>
                        <h6>Počet testovaných</h6>
                        <span className="newTested">+{mainData[0].tested_chart[Object.keys(mainData[0].tested_chart).length - 1].tested}</span> 
                    </div>
                </div>
                    <TabulkaMesta tabulkaData={mainData[0].districts} />
            </div>
        </>
    )
}

export default HandleDataSvk
