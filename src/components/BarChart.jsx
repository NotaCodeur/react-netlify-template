
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

// this is the chart for account rewards

    const { Title } = Typography;

    const BarChart = ({ accountObj, timeperiod }) => {

        const rewardsData = [];
        const timeData = [];
        const emptyLabels = [];

        if ( timeperiod == '30d' && accountObj.rewardsMonth.data ) {
            for (let i = 0; i < 30 ; i ++) {
                rewardsData.push( accountObj.rewardsMonth?.data[i].total)
                timeData.push(accountObj.rewardsMonth?.data[i].timestamp)
                emptyLabels.push('')
            }
        }

        if ( timeperiod == '7d' && accountObj.rewardsMonth.data ) {
            for (let i = 0; i < 7 ; i ++) {
                rewardsData.push( accountObj.rewardsMonth?.data[i].total)
                timeData.push(accountObj.rewardsMonth?.data[i].timestamp)
                emptyLabels.push('')
            }
        }

        if ( timeperiod == '52w' && accountObj.rewardsYear.data ) {
            for (let i = 0; i < 52 ; i ++) {
                rewardsData.push( accountObj.rewardsYear?.data[i].total)
                timeData.push(accountObj.rewardsYear?.data[i].timestamp)
                emptyLabels.push('')
            }
        }

        const data = {
            labels: emptyLabels,
            datasets: [
                {   
                    label: timeData,
                    barThickness: 15,
                    // barPercentage: 0.3,
                    data: rewardsData,
                    backgroundColor: ['#aeb8fe'],
                    borderWidth: 2,
                    borderRadius: 20,
                    borderSkipped: false,
                                        
                },
                
            ]
        };


        const 
            
            options = {
                maintainAspectRatio: false,
                scales: {
                    y: {
                        stacked: false,
                        display: false, 
                        grid: {display: false},
                        
                    },
                    x: {
                        beginAtZero: true,
                        display: false, 
                        stacked: false,
                        grid: {display: false},
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
                        text: 'Chart.js Doughnut Chart'
                    },
                    tooltips: {
                        enabled: false,
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


    export default BarChart;