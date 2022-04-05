
import React from 'react';
import { Lin, Doughnut, Pie } from 'react-chartjs-2';


import { Col, Row, Typography } from 'antd';



import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,

    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Tooltip,
    Legend
);



const { Title } = Typography;

const DoughnutChart = ({hostShare}) => {

    const ownerShare = 100 - hostShare ;

    const data = {
        labels: [],
        datasets: [
          {
            label: 'Dataset 1',
            data: [hostShare, ownerShare],
            backgroundColor: ['#FF8C8C', '#8CA8FF'],
            borderWidth: 2,
          }
        ]
      };


    const config = {
        type: 'doughnut',
        data: data,
        options: {
          responsive: true,
          plugins: {
            
            legend: {
              display: false,
              position: 'bottom',
            },
            title: {
              display: false,
              text: 'Chart.js Doughnut Chart'
            },
            tooltips: {
                enabled: false
             }
          }
        },
      };
     


      return (
        <>
            <div style={{width:'50%', height:'50%'}}>

            <Doughnut data={data} options={config} />
            </div>
            
            
        </>
    );

}

//   const DATA_COUNT = 5;
// const NUMBER_CFG = {count: DATA_COUNT, min: 0, max: 100};



// const actions = [
//     {
//       name: 'Randomize',
//       handler(chart) {
//         chart.data.datasets.forEach(dataset => {
//           dataset.data = {count: chart.data.labels.length, min: 0, max: 100};
//         });
//         chart.update();
//       }
//     },
//     {
//       name: 'Add Dataset',
//       handler(chart) {
//         const data = chart.data;
//         const newDataset = {
//           label: 'Dataset ' + (data.datasets.length + 1),
//           backgroundColor: [],
//           data: [],
//         };
  
//         for (let i = 0; i < data.labels.length; i++) {
//           newDataset.data.push({count: 1, min: 0, max: 100});
  
//           const colorIndex = i % Object.keys('#2224f1').length;
//           newDataset.backgroundColor.push(Object.values('#2224f1')[colorIndex]);
//         }
  
//         chart.data.datasets.push(newDataset);
//         chart.update();
//       }
//     },
//     {
//       name: 'Add Data',
//       handler(chart) {
//         const data = chart.data;
//         if (data.datasets.length > 0) {
//           data.labels.push('data #' + (data.labels.length + 1));
  
//           for (let index = 0; index < data.datasets.length; ++index) {
//             data.datasets[index].data.push( 10);
//           }
  
//           chart.update();
//         }
//       }
//     },
//     {
//       name: 'Hide(0)',
//       handler(chart) {
//         chart.hide(0);
//       }
//     },
//     {
//       name: 'Show(0)',
//       handler(chart) {
//         chart.show(0);
//       }
//     },
//     {
//       name: 'Hide (0, 1)',
//       handler(chart) {
//         chart.hide(0, 1);
//       }
//     },
//     {
//       name: 'Show (0, 1)',
//       handler(chart) {
//         chart.show(0, 1);
//       }
//     },
//     {
//       name: 'Remove Dataset',
//       handler(chart) {
//         chart.data.datasets.pop();
//         chart.update();
//       }
//     },
//     {
//       name: 'Remove Data',
//       handler(chart) {
//         chart.data.labels.splice(-1, 1); // remove the label first
  
//         chart.data.datasets.forEach(dataset => {
//           dataset.data.pop();
//         });
  
//         chart.update();
//       }
//     }
//   ];

  export default DoughnutChart;