import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import ReactApexChart from 'react-apexcharts';
import { newName } from '../../Services/Api';


const colors = ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0', '#546E7A', '#26a69a', '#D10CE8', '#2E93fA', '#66DA26', '#FF9800', '#FF4560'];

function Report() {

    const [series] = useState([
        {
            name: 'Total {newName}',
            data: [30, 40, 35, 50, 49, 60, 70, 91, 125, 140, 160, 180] // example data for each month
        }
    ]);

    const [options] = useState({
        chart: {
            height: 350,
            type: 'bar',
            events: {
                click: function (chart, w, e) {
                    // console.log(chart, w, e)
                }
            }
        },
        colors: ["#EA5F5F"],
        plotOptions: {
            bar: {
                columnWidth: '45%',
                distributed: true,
            }
        },
        dataLabels: {
            enabled: false
        },
        legend: {
            show: false
        },
        xaxis: {
            categories: [
                ["JAN"], ["FEB"], ["MAR"], ["APR"], ["MAY"], ["JUN"], ["JUL"], ["AUG"], ["SEP"], ["OCT"], ["NOV"], ["DEC"]
            ],
            labels: {
                style: {
                    colors: colors,
                    fontSize: '12px'
                }
            }
        }
    });


    const [series1] = useState([
        {
            name: 'Total Customer',
            data: [30, 40, 35, 50, 49, 60, 70, 91, 125, 140, 160, 180] // example data for each month
        }
    ]);

    const [options1] = useState({
        chart: {
            height: 350,
            type: 'bar',
            events: {
                click: function (chart, w, e) {
                    // console.log(chart, w, e)
                }
            }
        },
        colors: ["#FEB019"],
        plotOptions: {
            bar: {
                columnWidth: '45%',
                distributed: true,
            }
        },
        dataLabels: {
            enabled: false
        },
        legend: {
            show: false
        },
        xaxis: {
            categories: [
                ["JAN"], ["FEB"], ["MAR"], ["APR"], ["MAY"], ["JUN"], ["JUL"], ["AUG"], ["SEP"], ["OCT"], ["NOV"], ["DEC"]
            ],
            labels: {
                style: {
                    colors: colors,
                    fontSize: '12px'
                }
            }
        }
    });

    const [seriess] = useState([14, 23, 21, 17, 15, 10, 12, 17, 21]);

    const [optionss] = useState({
        chart: {
            height: 350,
            type: 'pie',
        },
        title: {
            // text: 'Total Healthcare Workers',
            align: 'center',
            offsetY: 20,
            style: {
                fontSize: '24px'
            }
        },
        colors: colors,
        stroke: {
            colors: ['#fff']
        },
        fill: {
            opacity: 0.8
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    });

    return (
        <div className='md:m-4 m-1 fontNew'>
            <div className="grid-cols-12 p-5 grid bg-white">
                <div className="md:col-span-6 col-span-12 p-3">
                    <div>
                        <h1 className='text-lg font-medium sm:ms-4 ms-0'>Total {newName}</h1>
                    </div>
                    <div>
                        <div id="chart">
                            <ReactApexChart options={options} series={series} type="bar" height={350} />
                        </div>
                        <div id="html-dist"></div>
                    </div>
                </div>
                <div className="md:col-span-6 col-span-12 p-3">
                    <div>
                        <h1 className='text-lg font-medium sm:ms-4 ms-0'>Total Customer</h1>
                    </div>
                    <div>
                        <div id="chart">
                            <ReactApexChart options={options1} series={series1} type="bar" height={350} />
                        </div>
                        <div id="html-dist"></div>
                    </div>
                </div>
                <div className="md:col-span-6 col-span-12 sm:p-5 p-1">
                    <div>
                        <h1 className='text-lg font-medium sm:ms-4 ms-0'>Total Healthworkers</h1>
                    </div>
                    <div className='p-[20px]'>
                        <div id="chart">
                            <ReactApexChart options={optionss} series={seriess} type="pie" height={350} />
                        </div>
                        <div id="html-dist"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Report