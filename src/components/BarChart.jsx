
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



    const { Title } = Typography;

    const BarChart = ({ hostShare }) => {

        const ownerShare = 100 - hostShare;

        const data = {
            labels: ['', '', '', '', '', '', '', '','','','','','','',],
            datasets: [
                {   
                    label: 'HNT',
                    barThickness: 15,
                    // barPercentage: 0.3,
                    data: [5, 3, 1, 8, 7, 2, 6, 1, 2, 4, 6, 5, 7, 3, 5, 8, 6, 6, 5],
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