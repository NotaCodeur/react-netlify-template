
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

    const HorizontalBarChart = ({ hostShare }) => {

        const ownerShare = 100 - hostShare;

        const data = {
            labels: [''],
            datasets: [
                {   
                    label: 'paid',  
                    barThickness: 15,
                    // barPercentage: 0.3,
                    data: [hostShare],
                    backgroundColor: ['#aeb8fe'],
                    borderWidth: 2,
                    borderRadius: 20,
                    borderSkipped: 'end',
                                        
                },
                {
                    label: 'to pay',
                    barThickness: 15,
                    // barPercentage: 0.3,
                    data: [ownerShare],
                    backgroundColor: ['#ff8600'],
                    borderWidth: 2,
                    borderRadius: 20,
                    
                },
                
            ]
        };


        const 
            
            options = {
                maintainAspectRatio: false,
                scales: {
                    y: {
                        stacked: true,
                        min: 0,
                        max: 100,
                        grid: {display: false},
                        
                    },
                    x: {
                        beginAtZero: true,
                        stacked: true,
                        grid: {display: false},

                    },
                },
                indexAxis: 'y',
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


    export default HorizontalBarChart;