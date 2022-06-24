
import React from 'react';
import { Lin, Doughnut, Pie, Bar } from 'react-chartjs-2';


import { Col, Row, Typography } from 'antd';



import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    TimeScale,
    PointElement,
    LineElement,
    BarElement,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    TimeScale,
    PointElement,
    LineElement,
    ArcElement,
    BarElement,
    Tooltip,
    Legend
);

// this is the chart for earnings
// THE PLAN:
// get all hotspots all earnings in bucket hour / week / month
// if theres a hotspot filter get [i of each hotspot]
// create a dataset for each bucket data = [hotspot1, 2, 3 ]
// 

const { Title } = Typography;

const EarningsChart = ({ accountObj, bucket, barsMin, barsMax, hotspots }) => {

    const dataSets = [];

    const rewardsData = [];
    const timeData = [];
    const emptyLabels = [];

    if (accountObj?.hotspots?.length) {
        for (let i = 0; i < accountObj?.hotspots?.length; i++) {
            if (hotspots.indexOf(i) > -1) {
                if (bucket == 'hour' && accountObj?.hotspots[i].rewardsHour?.data) {
                    for (let j = 0; j < 10; j++) {
                        rewardsData.push(accountObj?.hotspots[i].rewardsHour?.data?.[j].total)
                        timeData.push(accountObj?.hotspots[i].rewardsHour?.data?.[j].timestamp.substring(5,16))
                    }
                    dataSets.push(
                        {
                            label: accountObj?.hotspots[i].name,
                            barThickness: 15,
                            data: rewardsData,
                            backgroundColor: ['#aeb8fe'],
                            borderWidth: 2,
                            borderRadius: 20,
                            borderSkipped: false,
                        });
                }
                if (bucket == 'day' && accountObj?.hotspots[i].rewardsDay?.data) {
                    for (let j = 0; j < 10; j++) {
                        rewardsData.push(accountObj?.hotspots[i].rewardsDay?.data?.[j].total)
                        timeData.push(accountObj?.hotspots[i].rewardsDay?.data?.[j].timestamp.substring(2,10))
                    }
                    dataSets.push(
                        {
                            label: accountObj?.hotspots[i].name,
                            barThickness: 15,
                            data: rewardsData,
                            backgroundColor: ['#aeb8fe'],
                            borderWidth: 2,
                            borderRadius: 20,
                            borderSkipped: false,
                        });
                }
                
            }
        }
    }



    if (bucket == 'week' && accountObj.rewardsYear.data) {
        for (let i = 0; i < 52; i++) {
            rewardsData.push(accountObj.rewardsYear?.data[i].total)
            timeData.push(accountObj.rewardsYear?.data[i].timestamp)
            emptyLabels.push('')
        }
    }

    const data = {
        labels: timeData,
        datasets: dataSets
    };


    const

        options = {
            maintainAspectRatio: false,
            scales: {
                y: {
                    stacked: true,
                    display: true,
                    grid: { display: true },

                },
                x: {
                    beginAtZero: false,
                    display: true,
                    stacked: true,
                    grid: { display: true },
                    ticks: {
                        display: false //this will remove only the label
                    }

                },
            },
            indexAxis: 'x',
            // Elements options apply to all of the options unless overridden in a dataset
            // In this case, we are setting the border of each horizontal bar to be 2px wide
            elements: {
                bar: {




                }
            },
            responsive: true,
            plugins: {
                legend: {
                    display: false,
                    position: 'right',
                },
                title: {
                    display: false,
                    text: 'Chart.js Earnings Chart'
                },
                tooltips: {
                    enabled: true,
                }
            }
        };




    return (
        <>
            <div style={{ width: '100%', height: '100%' }}>

                <Bar data={data} options={options} />
            </div>


        </>
    );

}


export default EarningsChart;