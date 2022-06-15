
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

        if ( timeperiod == '30d'  ) {
            for (let i = 0; i <accountObj.rewardsMonth?.data?.length ; i ++) {
                rewardsData.push( accountObj.rewardsMonth?.data[i].total)
                timeData.push(accountObj.rewardsMonth?.data[i].timestamp)
            }
        }

        const data = {
            labels: timeData,
            datasets: [
                {   
                    label: 'HNT',
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
                        
                        grid: {display: false},
                        
                    },
                    x: {
                        beginAtZero: true,
                        stacked: false,
                        grid: {display: false},

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