import React from 'react'
// import coronaIcon from "../../imgs/coronaIcon.svg"
import { GiDeathSkull } from "react-icons/gi";
import { FaPlusCircle } from "react-icons/fa";
import { RiVirusLine } from "react-icons/ri";
import FormatNumber from './FormatNumber'
import '../css/dataWorld.scss'

function DataWorld({ mainData }) {
    // console.log(mainData, "a")
    // console.log(mainData)

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
        <div className="cardsDivNew">
            <div className="cardsNew">
                <div className="iconInCard cases">
                    <RiVirusLine />
                </div>
                <div className="upperText">Počet nakazených</div>
                <div className="mainText cases">
                    <FormatNumber prop={mainData[0].cases} />
                    {mainData[0].todayCases ? <span className="plusInfected">+<FormatNumber prop={mainData[0].todayCases} /></span> : null}

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
                    {mainData[0].recovered > 0 ?
                        <>
                            <FormatNumber prop={mainData[0].recovered} />
                            {mainData[0].todayRecovered ?
                                <span className="plusRecovered">+<FormatNumber prop={mainData[0].todayRecovered} /></span>
                                : null}
                        </>
                        : <div className="krajinaNezverejnuje">Krajina nezverejňuje počet vyliečených</div>}
                </div>
                <div className="underText">
                    {mainData[0].recovered > 0 && numberTrans3(mainData[0].cases, mainData[0].recovered)}
                </div>
            </div>


            <div className="cardsNew">
                <div className="iconInCard deaths">
                    <GiDeathSkull />
                </div>
                <div className="upperText">Počet úmrtí</div>
                <div className="mainText deaths">
                    <FormatNumber prop={mainData[0].deaths} />
                    {mainData[0].todayDeaths ? <span className="plusDeaths">+<FormatNumber prop={mainData[0].todayDeaths} /></span> : null}
                </div>
                <div className="underText">
                    {numberTrans3(mainData[0].cases, mainData[0].deaths)}
                </div>
            </div>




            {/* 
            <div className="cards">
                <div className="topCard">
                    <div className="obrDiv">
                        <div className="circle">
                            <img alt="" src={coronaIcon} />
                        </div>
                    </div>
                    <div className="textCard">Počet nakazených</div>
                </div>
                <div className="mainText">
                    <FormatNumber prop={mainData[0].cases} />
                    <div className="aktiveNakazenych">
                        <span>Počet aktívnych prípadov:</span> <FormatNumber prop={mainData[0].active} />
                    </div>
                </div>
            </div>


            <div className="cards">
                <div className="topCard">
                    <div className="obrDiv">
                        <div className="circle HP">
                            <FaPlusCircle color={"green"} />
                        </div>
                    </div>
                    <div className="textCard"> Počet vyliečených</div>
                </div>
                <div className="mainText">
                    <FormatNumber prop={mainData[0].recovered} />
                    {numberTrans3(mainData[0].cases, mainData[0].recovered)}
                </div>
            </div>

            <div className="cards">
                <div className="topCard">
                    <div className="obrDiv">
                        <div className="circle skull">
                            <GiDeathSkull color={"white"} />
                        </div>
                    </div>
                    <div className="textCard"> Počet úmrtí</div>
                </div>
                <div className="mainText">
                    <FormatNumber prop={mainData[0].deaths} />
                    {numberTrans3(mainData[0].cases, mainData[0].deaths)}
                </div>
            </div> */}
        </div >
    )
}

export default DataWorld
