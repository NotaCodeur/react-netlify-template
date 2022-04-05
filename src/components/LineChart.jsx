
import React from 'react';
import { Line } from 'react-chartjs-2';
// import Line from 'chart.js/auto';

import { Col, Row, Typography } from 'antd';



import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,

    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,

    Tooltip,
    Legend
);

const { Title } = Typography;

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
    const coinPrice = [];
    const coinTimestamp = [];


    for (let i = coinHistory?.data?.history?.length - 1; i >= 0; i --) {
        coinPrice.push(coinHistory?.data?.history[i].price);
    }

    for (let i = coinHistory?.data?.history?.length - 1; i >= 0; i --) {
        coinTimestamp.push(new Date(coinHistory?.data?.history[i].timestamp * 1000).toLocaleDateString());
    }

    




    const data = {
        labels: coinTimestamp,
        datasets: [
            {
                label: 'Price In USD',
                data: coinPrice,
                fill: false,
                backgroundColor: '#f1f2f6',
                borderColor: '#758bfd',
            },
        ],
    };

    const options = {
        scales: {
            yAxes:[
            {
                ticks: {
                    reverse: false,
                    beginAtZero: false,
                },


            },
        ],


            xAxes: [{
                type: 'linear',

                ticks: {
                    reverse: true,
                }
            }
        ],

        },
    };

    return (
        <>
            <Row className="chart-header">
                <Title level={2} className="chart-title">{coinName} Price Chart </Title>
                <Col className="price-container">
                    <Title level={5} className="price-change">Change: {coinHistory?.data?.change}%</Title>
                    <Title level={5} className="current-price">Current {coinName} Price: $ {currentPrice}</Title>
                </Col>
            </Row>
            <Line data={data} options={options} />
            
            
        </>
    );
};

export default LineChart;
