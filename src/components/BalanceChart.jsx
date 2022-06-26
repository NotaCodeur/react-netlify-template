
    import React from 'react';
    import { Line, Doughnut, Pie, Bar } from 'react-chartjs-2';


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

    const BalanceChart = ({ accountObj, timeframe }) => {

        const rewardsData = [];
        const timeData = [];
        const emptyLabels = [];

        if ( timeframe == 'day' && accountObj?.accountStats?.data ) {
            for (let i = accountObj?.accountStats?.data?.last_day?.length -1; i >= 0  ; i --) {
                rewardsData.push( accountObj.accountStats?.data?.last_day[i]?.balance / 100000000)
                timeData.push(accountObj.accountStats?.data?.last_day[i].timestamp.substring(5,16))
                // emptyLabels.push('')
            }
        }

        if ( timeframe == 'week' && accountObj?.accountStats?.data ) {
            for (let i = accountObj?.accountStats?.data?.last_week?.length -1; i >= 0  ; i --) {
                rewardsData.push( accountObj.accountStats?.data?.last_week[i].balance / 100000000)
                timeData.push(accountObj.accountStats?.data?.last_week[i].timestamp.substring(5,16))
                // emptyLabels.push('')
            }
        }

        if ( timeframe == 'month' && accountObj?.accountStats?.data ) {
            for (let i = accountObj?.accountStats?.data?.last_month?.length -1; i >= 0  ; i --) {
                rewardsData.push( accountObj.accountStats?.data?.last_month[i].balance / 100000000)
                timeData.push(accountObj.accountStats?.data?.last_month[i].timestamp.substring(0,10))
                // emptyLabels.push('')
            }
        }

        const data = {
            labels: timeData,
            datasets: [
                {   
                    label: 'HNT:',
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

                    <Line data={data} options={options} />
                </div>


            </>
        );

    }


    export default BalanceChart;