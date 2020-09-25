import React from 'react'
import { Bar } from 'react-chartjs-2';
import { Chart } from 'react-chartjs-2';
import './css/cssPreBarGrafy.css'
import FormatNumberShorter from './components/FormatNumberShorter'
import './css/cssPreBarGrafy.css'
import { FiBarChart } from 'react-icons/fi'
import { BiBarChart } from 'react-icons/bi'

function BarGrafSvk(props) {
    const propsData = props.props

    const allData = {
        dataSetsCases: {
            labels: propsData.datumy,
            datasets: [{
                label: 'Počet mŕtvych',
                backgroundColor: "grey",
                data: propsData.dataSetsDeaths.datasets[0].data,
            },
            {
                label: 'Počet vyliečených',
                backgroundColor: "#57C757",
                data: propsData.dataSetsRecovered.datasets[0].data,
            },
            {
                label: 'Počet nakazených',
                backgroundColor: "#FF4D4D",
                data: propsData.dataSetsCases.datasets[0].data,
            }],
        },

        dataSetsDailyCasesAndTests: {
            labels: propsData.datumy,
            datasets: [{
                label: 'Prírastok nakazených',
                backgroundColor: "salmon",
                data: propsData.dataSetsDailyCases.datasets[0].data,
            },
            {
                label: 'Prírastok testov',
                backgroundColor: "#b4f1f1",
                data: propsData.dataSetsDailyTests.datasets[0].data,
            }],
        },

        dataSetsDailyCases: {
            labels: propsData.datumy,
            datasets: propsData.dataSetsDailyCases.datasets
        },

        dataSetsActiveCases: {
            labels: propsData.datumy,
            datasets: propsData.dataSetsActiveCases.datasets
        },

        options: {
            maintainAspectRatio: false,
            responsive: true,

            legend: {
                position: "bottom",
                labels: {
                    padding: 25,
                },
                onClick: function (e, legendItem) {
                    const defaultLegendClickHandler = () => { return Chart.defaults }
                    defaultLegendClickHandler(e, legendItem);
                    // return 
                    var index = legendItem.datasetIndex;
                    var ci = this.chart;
                    var meta = ci.getDatasetMeta(index);
                    // See controller.isDatasetVisible comment
                    meta.hidden = meta.hidden === null ? !ci.data.datasets[index].hidden : null;

                    // We hid a dataset ... rerender the chart
                    ci.update();

                }
            },
            scales: {
                xAxes: [{
                    stacked: true,
                    gridLines: {
                        display: false,
                    }
                }],
                yAxes: [{
                    stacked: true,
                    ticks: {
                        callback: function (value) {
                            return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                        }
                    }
                }]
            },
            tooltips: {
                // mode: 'x',
                mode: 'index',
                position: 'nearest',
                intersect: false,
                callbacks: {
                    label: function (tooltipItem, chart) {
                        var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';

                        return datasetLabel + ": " + tooltipItem.yLabel.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                    }
                },
            },
            animation: {
                duration: 500,
                onProgress: function () {
                    if (propsData.nacitatViacUdajov === false) {
                        var chartInstance = this.chart,
                            ctx = chartInstance.ctx;
                        ctx.textAlign = 'center';
                        ctx.fillStyle = "rgba(0, 0, 0, .75)";
                        ctx.textBaseline = 'bottom';
                        if (window.innerWidth > 1220) {
                            ctx.font = "bold 12px Arial";
                        }
                        else if (window.innerWidth > 720) {
                            ctx.font = "bold 11px Arial";
                        }
                        else {
                            ctx.font = "bold 6px Arial";
                        }
                        this.data.datasets.forEach(function (dataset, i) {
                            var meta = chartInstance.controller.getDatasetMeta(i);
                            meta.data.forEach(function (bar, index) {
                                var data = dataset.data[index];
                                if (index % 2 === 0) {
                                    if (dataset.data._chartjs.listeners[0].chart.legend.legendItems[0].hidden === true
                                        || dataset.data._chartjs.listeners[0].chart.legend.legendItems[0].hidden === false) {
                                        if (dataset.data._chartjs.listeners[0].chart.legend.legendItems[0].text === "Počet mŕtvych") { //overenie pre posledny graf (tri udaje v objekte)
                                            let pom1 = []
                                            dataset.data._chartjs.listeners[0].chart.legend.legendItems.map((jedno, id) => {
                                                pom1[id] = jedno.hidden
                                                return pom1
                                            })
                                            if (bar._model.datasetLabel === "Počet mŕtvych" && pom1[0] === false)
                                                ctx.fillText(FormatNumberShorter(data), bar._model.x, bar._model.y - 4)
                                            else if (bar._model.datasetLabel === "Počet vyliečených" && pom1[1] === false)
                                                ctx.fillText(FormatNumberShorter(data), bar._model.x, bar._model.y - 4)
                                            else if (bar._model.datasetLabel === "Počet nakazených" && pom1[2] === false)
                                                ctx.fillText(FormatNumberShorter(data), bar._model.x, bar._model.y - 4)

                                        }

                                        else if (dataset.data._chartjs.listeners[0].chart.legend.legendItems[0].text === "Prírastok nakazených") {
                                            let pom1 = []
                                            dataset.data._chartjs.listeners[0].chart.legend.legendItems.map((jedno, id) => {
                                                pom1[id] = jedno.hidden
                                                return pom1
                                            })
                                            if (!pom1[0])
                                                ctx.fillText(FormatNumberShorter(data), bar._model.x, bar._model.y - 4)
                                        }

                                        else
                                            ctx.fillText(FormatNumberShorter(data), bar._model.x, bar._model.y - 4)

                                    }
                                }
                                else {
                                    if (data < 100) {
                                        if (dataset.data._chartjs.listeners[0].chart.legend.legendItems[0].hidden === true
                                            || dataset.data._chartjs.listeners[0].chart.legend.legendItems[0].hidden === false) {

                                            if (dataset.data._chartjs.listeners[0].chart.legend.legendItems[0].text === "Počet mŕtvych") { //overenie pre posledny graf (tri udaje v objekte)
                                                let pom1 = []
                                                dataset.data._chartjs.listeners[0].chart.legend.legendItems.map((jedno, id) => {
                                                    pom1[id] = jedno.hidden
                                                    return pom1
                                                })
                                                if (bar._model.datasetLabel === "Počet mŕtvych" && pom1[0] === false)
                                                    ctx.fillText(FormatNumberShorter(data), bar._model.x, bar._model.y - 4)
                                                else if (bar._model.datasetLabel === "Počet vyliečených" && pom1[1] === false)
                                                    ctx.fillText(FormatNumberShorter(data), bar._model.x, bar._model.y - 4)
                                                else if (bar._model.datasetLabel === "Počet nakazených" && pom1[2] === false)
                                                    ctx.fillText(FormatNumberShorter(data), bar._model.x, bar._model.y - 4)

                                            }
                                            else
                                                ctx.fillText(FormatNumberShorter(data), bar._model.x, bar._model.y - 4)
                                        }
                                    }
                                }
                            })
                        })
                    }
                }
            },
        },
    }

    return (
        <div>
            <div className="mainDivPreGrafy" >


                <div className="NacitatViacDniDoGrafov" onClick={() => props.ZmenitLoadMoreData()}>
                    {props.loadMoreData.bool ? <FiBarChart className="chartIcon" /> : <BiBarChart className="chartIcon" />}
                    {props.loadMoreData.text}
                </div>
                <div className="barsGrafy" >
                    <h1>Denný prírastok nakazených</h1>
                    <Bar
                        data={allData.dataSetsDailyCases}
                        options={allData.options}
                    />
                </div>

                <div className="NacitatViacDniDoGrafov" onClick={() => props.ZmenitLoadMoreData()}>
                    {props.loadMoreData.bool ? <FiBarChart className="chartIcon" /> : <BiBarChart className="chartIcon" />}
                    {props.loadMoreData.text}
                </div>
                <div className="barsGrafy" >
                    <h1>Celkový počet aktívnych prípadov</h1>
                    <Bar
                        data={allData.dataSetsActiveCases}
                        options={allData.options}
                    />
                </div>

                <div className="NacitatViacDniDoGrafov" onClick={() => props.ZmenitLoadMoreData()}>
                    {props.loadMoreData.bool ? <FiBarChart className="chartIcon" /> : <BiBarChart className="chartIcon" />}
                    {props.loadMoreData.text}
                </div>
                <div className="barsGrafy"  >
                    <h1>Celkový prírastok nakazených/vyliečených</h1>
                    <Bar
                        data={allData.dataSetsCases}
                        options={allData.options}
                    />
                </div>

                <div className="NacitatViacDniDoGrafov" onClick={() => props.ZmenitLoadMoreData()}>
                    {props.loadMoreData.bool ? <FiBarChart className="chartIcon" /> : <BiBarChart className="chartIcon" />}
                    {props.loadMoreData.text}
                </div>
                <div className="barsGrafy" >
                    <h1>Denný prírastok nakazených/testov</h1>
                    <Bar
                        data={allData.dataSetsDailyCasesAndTests}
                        options={allData.options}
                    />
                </div>

            </div>
        </div>
    )
}

export default BarGrafSvk
