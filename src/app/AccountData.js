import React, { useState, useEffect, Component } from 'react';
import { useGetHeliumSupplyQuery, useGetHeliumHotspotsQuery, useGetHeliumHotspotsEarningsQuery } from '../services/heliumApi';


const AccountData = ({}) => {

const [AccountObj, setAccountObj] = useState([
    {
    AccountAddress: '13aik3sfNPtxHZuv4v6XQeLp5N9QG6qb4rY6rDEzfJJaxWdrERm',
    hotspots: [],
    transactions: {
        allTransaction: [{}],
        ownerTransaction: [{}],
        payeeTransactions: [{}],
    }
}
])
    
// const AccountObj = {
//     AccountAddress: '13aik3sfNPtxHZuv4v6XQeLp5N9QG6qb4rY6rDEzfJJaxWdrERm',
//     hotspots: [],
//     transactions: {
//         allTransaction: [{}],
//         ownerTransaction: [{}],
//         payeeTransactions: [{}],
//     },
// };
const hotspotObj = {
    hotspotName: '',
    hotspotAddress: '',
    hostAddress: '',
    hostShare: '',
    rewards: {
        total: 0,
        paidOut: 0,
        toPay: 0,
        rewardData: [],
    },
};

    // const GetAccountHotspots = (AccountAddress) => {
    //     const { data: myHotspots } = useGetHeliumHotspotsQuery(AccountObj.AccountAddress);
    
        
    //     for (let i = myHotspots?.data?.length - 1; i >= 0; i--) {
    //         AccountObj.hotspots[i].push(hotspotObj);
    //     }
    //     for (let i = myHotspots?.data?.length - 1; i >= 0; i--) {
    //         AccountObj.hotspots[i].hotspotObj.hotspotName.push(myHotspots.data[i].name);
    //     }
    
    //     console.log('yay it worked');
    // };
 

    // GetHotspotRewards = (hotspotAddress) => {
    //     const { data: hotspotRewardData } = useGetHeliumHotspotsEarningsQuery(hotspotAddress);
    //     const rewards = [];
    //     const rewardsTimestamp = [];
    //     for (let i = hotspotRewardData?.data?.length - 1; i >= 0; i --) {
    //         rewards.push(hotspotRewardData?.data[i].amount);
    //     }
    //     for (let i = coinHistory?.data?.history?.length - 1; i >= 0; i --) {
    //         rewardsTimestamp.push(new Date(hotspotRewardData?.data[i].timestamp * 1000).toLocaleDateString());
    //     }
    //     const rewardsAndTime = [{rewards, rewardsTimestamp}];
    //     AccountObj.hotspots.hotspotName.rewards.rewardData = rewardsAndTime;
    //     // rewardData = [
    //     //     {
    //     //         "amount": 7885016,
    //     //         "timestamp": "2020-08-28T01:29:46.000000Z"
    //     //     },
    //     //     {
    //     //         "amount": 7885016,
    //     //         "timestamp": "2020-08-28T01:29:46.000000Z"
    //     //     },
    //     //     {
    //     //         "amount": 7885016,
    //     //         "timestamp": "2020-08-28T01:29:46.000000Z"
    //     //     },
    //     //     {
    //     //         "amount": 7885016,
    //     //         "timestamp": "2020-08-28T01:29:46.000000Z"
    //     //     },
    //     // ]
    // };
  
}


export default AccountData;

