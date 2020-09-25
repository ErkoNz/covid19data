function FuncSetDataForGraph(setDataForChart, datumy, dailyCases, valueActiveCases, valuesCases, valueDeaths, valueRecovered, valueTest, booleanProp) {
    setDataForChart({
        nacitatViacUdajov: booleanProp,
        datumy: datumy,

        dataSetsCases: {
            datasets: [
                {
                    label: "Celkový počet nakazených",
                    data: valuesCases,
                    backgroundColor: "rgb(249, 70, 68)",
                    fillColor: 'black',
                    hoverBackgroundColor: 'red',
                }
            ]
        },

        dataSetsDeaths: {
            datasets: [
                {
                    label: "Celkový počet úmrtí",
                    data: valueDeaths,
                    backgroundColor: "grey",
                    hoverBackgroundColor: 'grey',
                }
            ]
        },

        dataSetsRecovered: {
            datasets: [
                {
                    label: "Celkový počet vyliečených",
                    data: valueRecovered,
                    backgroundColor: "green",
                    hoverBackgroundColor: 'green',
                }
            ]
        },

        dataSetsActiveCases: {
            datasets: [
                {
                    label: "Celkový počet aktivnych prípadov",
                    data: valueActiveCases,
                    backgroundColor: "#cb464a",
                    hoverBackgroundColor: '#b42429',
                }
            ]
        },

        dataSetsDailyCases: {
            datasets: [
                {
                    label: "Denný prírastok nakazených",
                    data: dailyCases,
                    backgroundColor: "salmon",
                    hoverBackgroundColor: '#f96353',
                }
            ]
        },

        dataSetsDailyTests: {
            datasets: [
                {
                    label: "Denný prírastok testov",
                    data: valueTest,
                    backgroundColor: "cyan",
                    hoverBackgroundColor: 'cyan',
                }
            ]
        },
    })
}

export default FuncSetDataForGraph
