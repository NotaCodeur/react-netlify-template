import React, { useState, useEffect, Component, useMemo, useCallback } from 'react';
import millify from 'millify';
import { Typography, Row, Col, Statistic, Input, Space, Button, Card } from 'antd';
import { Link } from 'react-router-dom';

import { useGetCryptosQuery } from '../services/cryptoApi';
import { Cryptocurrencies, News } from '../components';
import { 
  useGetHeliumHotspotsRewardsAllTimeQuery, 
  useGetHeliumHotspotsQuery, 
  useGetHeliumAccountRewardsAllTimeQuery, 
  useGetHeliumAccountRewardsWeekQuery, 
  useGetHeliumAccountRewardsMonthQuery, 
  useGetHeliumAccountRewardsYearQuery, 
  useGetHeliumAccountStatsQuery, 
  useGetHeliumAccountRolesCountQuery, 
  useGetHeliumAccountRolesPayTransactionsQuery, 
  useGetHeliumAccountRolesCursorQuery,
  useGetHeliumTransactionHashQuery 
} from '../services/heliumApi';

import BarChart from './BarChart';
import BarChart2 from './BarChart2';



const { Title } = Typography;

const Homepage = () => {
  const [accountObj, setAccountObj] = useState({
    AccountAddress: '',
    hotspots: [],
    rewardsAllTime: 0,
    rewardsWeek: [],
    rewardsMonth: [],
    rewardsYear: [],
    accountStats: [],
    accountRolesCount: {},
    heliumStats: [],
    transactions: {
      allTransaction: [{}],
      paymentTransactions: [],
      payeeTransactions: [{}],
    },
  });

  
  const { data, isFetching } = useGetCryptosQuery(10);
  const [mainButtonIsClicked, setMainButtonIsClicked ] = useState(false);
  const [mainButtonIsClickedI, setMainButtonIsClickedI ] = useState(false);
  const [mainButtonIsClickedII, setMainButtonIsClickedII ] = useState(false);
  const [mainButtonIsClickedIII, setMainButtonIsClickedIII ] = useState(false);
  const [mainButtonIsClickedFinal, setMainButtonIsClickedFinal ] = useState(false);
  const [ count, setCount ] = useState(0);
  const [ countI, setCountI ] = useState(0);

  const [ paymentCursor, setPaymentCursor ] = useState('');
  const [skip, setSkip] = useState(true);
  const [skip1, setSkip1] = useState(true);
  const [skip2, setSkip2] = useState(true);
  const [skip3, setSkip3] = useState(true);

  const [hotspotAddress, setHotspotAddress] = useState('');
  const [aaccountAddress, setAaccountAddress] = useState('');
  const [ hotspotRewardArray, setHotspotAwardArray ] = useState([]);
  const { data: hotspotsRewards } = useGetHeliumHotspotsRewardsAllTimeQuery(hotspotAddress, {skip});
  const globalStats = data?.data?.stats;
  // Helium stats functionality
  const [walletInputField, setWalletInputField] = useState('');
  const { data: myHotspots } = useGetHeliumHotspotsQuery(accountObj.AccountAddress, {skip: skip1});
  const [myHotspotData, setMyHotspotData] = useState([[]]);
  const [hotspots, setHotspots] = useState([[]]);
  const { data: accountRewardsAllTime } = useGetHeliumAccountRewardsAllTimeQuery(accountObj.AccountAddress, {skip: skip1});
  const { data: accountRewardsWeek } = useGetHeliumAccountRewardsWeekQuery(accountObj.AccountAddress, {skip: skip1});
  const { data: accountRewardsMonth } = useGetHeliumAccountRewardsMonthQuery(accountObj.AccountAddress, {skip: skip1});
  const { data: accountRewardsYear } = useGetHeliumAccountRewardsYearQuery(accountObj.AccountAddress, {skip: skip1});
  const { data: accountStats } = useGetHeliumAccountStatsQuery(accountObj.AccountAddress, {skip: skip1});
  const { data: accountRolesCount } = useGetHeliumAccountRolesCountQuery(accountObj.AccountAddress, {skip: skip1});
  const { data: payTransactionsObj } = useGetHeliumAccountRolesPayTransactionsQuery(accountObj.AccountAddress, {skip: skip1});
  const { data: paymentCursorObj } = useGetHeliumAccountRolesCursorQuery({address: accountObj.AccountAddress, cursor: paymentCursor},  {skip: skip2});
// zou de twee variables ook in een obj / array kunne zetten. dan passen we maar een ding en werkt de skip wel.
const [ hash, setHash ] = useState('');
const { data: transactionsData } = useGetHeliumTransactionHashQuery(hash, {skip: skip3});
  
  const [earningsPeriod, setEarningsPeriod] = useState('30d');

  const cardStyle = { background: '#ffffff', borderRadius: 20, marginBottom: 15, margin: 0, padding: 5, width: '99%', boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)"}
  const buttonStyle = {borderRadius: 20, borderColor: '#758bfd'}




  useEffect(() => {
    console.log(walletInputField)
  }, [walletInputField])

  useEffect(() => {
    console.log('accObj: ',accountObj)
  }, [accountObj])

  useEffect(() => {
    let filterMyHotspots = myHotspots?.data;
    if (filterMyHotspots != null && filterMyHotspots.address != 'hotspots') {
      console.log('filterMyHotspots: ', filterMyHotspots)
    setMyHotspotData(filterMyHotspots);
    }
  }, [myHotspots]);

   useEffect(() => {
    if (mainButtonIsClicked === true) {
      console.log('main button is true')
      
      setAccountObj(accountObj => ( {...accountObj, AccountAddress: walletInputField } ) );
      setAaccountAddress(walletInputField);
      setMainButtonIsClicked(false);
      if (myHotspotData != '') {
        setAccountObj( accountObj => ( {...accountObj, hotspots: myHotspotData} ) );
        setCount(1);
        console.log('set count 1 via main button click')
      }
    }
  }, [mainButtonIsClicked]);

  useEffect(() => {
    if(accountObj.AccountAddress != '' && skip1 == true) {
      setSkip1(false);
      console.log('set skip1 false')
    }
  }, [accountObj.AccountAddress])

  useEffect(() => {
    if (myHotspotData != '') {
      setAccountObj( accountObj => ( {...accountObj, hotspots: myHotspotData} ) );
      setCount(1);
      console.log('myHotspotData:', myHotspotData)
    }
  }, [myHotspotData]);

  useEffect(() => {
    if (accountRewardsAllTime != null) {
      console.log('accountRewardsAllTime:', accountRewardsAllTime)
      setAccountObj( accountObj => ( {...accountObj, rewardsAllTime: accountRewardsAllTime} ) );
    }
  }, [accountRewardsAllTime]);
  
  useEffect(() => {
    if (accountRewardsMonth != null) {
      console.log('accountRewardsMonth: ', accountRewardsMonth)
      setAccountObj( accountObj => ( {...accountObj, rewardsMonth: accountRewardsMonth} ) );
    }
  }, [accountRewardsMonth]);
  
  useEffect(() => {
    if (accountRewardsWeek != null) {
      console.log('accountRewardsWeek:', accountRewardsWeek)
      setAccountObj( accountObj => ( {...accountObj, rewardsWeek: accountRewardsWeek } ) );
    }
  }, [accountRewardsWeek]);
  
  useEffect(() => {
    if (accountRewardsYear != null) {
      console.log('accountRewardsYear:', accountRewardsYear)
      setAccountObj( accountObj => ( {...accountObj, rewardsYear: accountRewardsYear } ) );
    }
  }, [accountRewardsYear]);
  
  useEffect(() => {
    if (accountStats != null && accountStats.data.address != 'stats') {
      console.log('accountStats:', accountStats)
      setAccountObj( accountObj => ( {...accountObj, accountStats: accountStats } ) );
    }
  }, [accountStats]);
  
  useEffect(() => {
    if (accountRolesCount != null) {
      console.log('accountRolesCount:', accountRolesCount)
      setAccountObj( accountObj => ( {...accountObj, accountRolesCount: accountRolesCount } ) );
    }
  }, [accountRolesCount]);



// useEffect(() => {
//   if(myHotspots?.length){

//     myHotspots?.forEach((Element, i) => {
//       setTimeout(() => {
//         setHotspotAddress(Element.data?.address)
//         // await hotspotsRewards
//         console.log('for each set hotspotAdress ', Element.data)
        
//       })
//     }, 2000);
//   }
// }, [myHotspots])

// here comes the for loop to get the hotspot rewards
  useEffect(() => {
    setTimeout(() => {

      let index = count -1;
      let int = accountObj?.hotspots?.length +1;
      if ( count > 0 && count < int ) {
      console.log( accountObj?.hotspots?.length );
      console.log(int);
      setHotspotAddress((accountObj?.hotspots?.[count-1]?.address))
      console.log('setting hotspot Address')
      console.log('index:',index)
    }
    if (count >= int) {
      setCount(0);
      console.log(' if count -1 == hotspots.length => setCount(0)');
    }
  }, 1500)
  }, [accountObj.hotspots, count])

  useEffect(() => {
    if(hotspotAddress != '' && skip == true) {
      console.log('set skip to false')
      setSkip(false);
    }
  }, [hotspotAddress])

  useEffect(() => {
    let index = count -1;
    let int = accountObj?.hotspots?.length +1;
    let obj = accountObj?.hotspots?.[count - 1];
    let array = accountObj;
    let array2 = []; 
    array2 = [...array?.hotspots];
    
    if (index >= 0 && count < int) {

      console.log('hotRew: ', hotspotsRewards)
      obj = {...obj, rewardsAllTime: hotspotsRewards};
      console.log('obj: ', obj)
      
      if ( array2?.[index].hotspotRewardsAllTime != hotspotAddress  ) {
        array2[index] = obj
      };
      console.log(array2[index])
      
      setAccountObj( accountObj => ({...accountObj, hotspots: array2 }))
      setCount(count => count + 1);
      
    }
  }, [hotspotsRewards])


  // to get transactions we need to use Helium api /roles
  // /roles?filert_types= gives us an object with a cursor to loop through the results
  // ever cursor obj has another cursor obj till the last result, which has no cursor

  // first result we store in obj, take the cursor in another obj, then useQuery(.... , cursor)
  // then we take cursorResult.cursor to set the new cursor and the loop begins     
  useEffect(() => {
    if (payTransactionsObj !== undefined && payTransactionsObj.data.address !== 'roles' ) {

      console.log(payTransactionsObj)
      setPaymentCursor(payTransactionsObj.cursor)
    }
  }, [payTransactionsObj])
  
  useEffect(() => {
    setTimeout(() => {
      if (paymentCursor !== undefined && paymentCursor !== '') {
        console.log('paymentCursor: ', paymentCursor)
        if (skip2 === true) {
          setSkip2(prev => prev = false )
          console.log('skip2:', skip2)
        }
      }
    }, 2000)
  }, [paymentCursor])

  useEffect(() => {
    if(paymentCursorObj !== undefined && paymentCursorObj.data.address !== 'roles') {
      console.log('paymentCursorObj: ', paymentCursorObj)
      if (paymentCursorObj?.data?.length > 0) {
        let array = accountObj.transactions.paymentTransactions;
        for (let i = 0; i < paymentCursorObj.data.length; i ++) {
          array.push(paymentCursorObj.data[i])
        }
        setAccountObj(accountObj => ( {...accountObj, transactions: {...accountObj.transactions, paymentTransactions: [...array] } } ) );  
        // setHash(paymentCursorObj.data.hash)  
      }
      if (paymentCursorObj.cursor !== undefined ) {
        setTimeout(() => {
          setPaymentCursor(paymentCursorObj.cursor);
        }, 1000)
      }
    }
  }, [paymentCursorObj])
  

  // here comes a loop to get transactions for each hash in the paymentTransactions
  // when there is a transaction -> setHash()
  // *fetching transactionData* 
  // setAccountObj( paymentTransactions: [ ...paymentTransactions, transactions[i]: {...transaction[i], data: transactionData.data} ])
 
  useEffect(() => {
    if (accountObj.transactions.paymentTransactions.length) {
     for (let i = 0; i < accountObj.transactions.paymentTransactions.length; i ++) {
      if (accountObj.transactions.paymentTransactions[i].data === undefined) {
        console.log('no trans data for payment yet -> setHash() to get trans data')
        setHash(prev => prev = accountObj.transactions.paymentTransactions[i].hash)
      } 
     } 
    }
  }, [accountObj.transactions.paymentTransactions])

  useEffect(() => {
    if (hash !== '' && hash !== undefined && skip3 === true) {
      console.log('hash changed, skip3: ', skip3 )
      setSkip3(prev => prev = false)
    }
  }, [hash])

  useEffect(() => {
    if (transactionsData !== undefined) {
      console.log('transactionsData: ', transactionsData)
      let i = accountObj.transactions.paymentTransactions.findIndex( obj => obj.hash === transactionsData.data?.hash);
      console.log(i);
      // let i = accountObj.transactions.paymentTransactions.filter({data: {hash: transactionsData.data?.hash}} => );
      let array = [...accountObj.transactions.paymentTransactions];
      array[i] = {...array[i], data: transactionsData.data};
      setAccountObj(accountObj => ( {...accountObj, transactions: {...accountObj.transactions, paymentTransactions: array} } ) );
      // setAccountObj(accountObj => ( {...accountObj, transactions: {...accountObj.transactions, paymentTransactions: [ ...accountObj.transactions.paymentTransactions, accountObj.transactions.paymentTransactions[i]: {...accountObj.transactions.paymentTransactions[i], data: transactionData.data} ]}}))
  
    }
  }, [transactionsData])
  


  const earnButtons = () => {

  }

  // useEffect(() => {
  //   let data = {}
  //   if (localStorage.getItem('Account') != null) {
  //     data = localStorage.getItem('Account')
  //     if (data) {
  //       setAccountObj(JSON.parse(data));
  //     }
  //   };
  //   // if (data) {
  //   //   setAccountObj(JSON.parse(data));
  //   // }
  // }, [])

  // useEffect(() => {
  //   if (mainButtonIsClicked == true) {
  //     console.log('main button is true')
  //     addWalletToAccObj();

  //     setMainButtonIsClickedI(true);
  //     setMainButtonIsClicked(false);
  //   }
  // }, [mainButtonIsClicked])

  // useEffect(() => {
  //   console.log(myHotspots);
  //   if (accountObj.AccountAddress != '') {
  //     addHotspotsToHotspots();
  //     setMainButtonIsClickedII(true);
  //     setMainButtonIsClickedI(false);
  //   }
  // }, [mainButtonIsClickedI])

  // useEffect(() => {
  //   if (mainButtonIsClickedII == true) {
  //     console.log('were running second state loop')
  //     console.log(hotspots)
  //     addHotspotsToAccObj();

  //     setMainButtonIsClickedIII(true);
  //     setMainButtonIsClickedII(false);
  //   }
  // }, [mainButtonIsClickedII])

  // useEffect(() => {
  //   if (mainButtonIsClickedIII == true) {

      
  //     for (let i = 0; i < accountObj.hotspots.length; i++) {
  //       let obj = accountObj.hotspots[i];
  //       let index = i;
  //       obj = { ...obj, hostAddress: '', hostShare: 0, rewardsAllTime: [], rewardsYear: [], rewardsMonth: [], rewardsWeek: [] };
  //       addHotspotObjToHotspots(obj, index);
  //     }
      
  //     // now comes the part for fetching the reward data for the AccountAddress
  //     addRewardsToAccount();
  //     // setCount(1)
  //     console.log(accountObj);

  //     setCount(1);
  //     setMainButtonIsClickedIII(false)

  //   }
  // }, [mainButtonIsClickedIII])


  // useEffect(() => {
  //   let index = count -1;
  //   let obj = accountObj;
  //   if (count > 0) {
  //     console.log('here comes the set hotspot address in a useState');
  //     console.log(index);
  //     setHotspotAddress( accountObj.hotspots[index]?.address)
  //     // if ( index >=0) { addRewardsToHotspot( index ) };
  //     console.log(accountObj);
  //     console.log(hotspotAddress);
  //     setCountI((prevCountI) => prevCountI  +1 );
  //     // if (index < obj?.hotspots?.length && index >= 0 ) { setCountI((prevCountI) => prevCountI  +1 ) }
      
  //     setMainButtonIsClickedFinal(true);  
  //     if (index == obj?.hotspots?.length ) { 
  //       console.log('count = hotspot.length, set count back to 0')
  //       setCount(0); 
  //     }
  //   }
  // }, [count])
  
  // useEffect(() => {
  //   let index = countI -1;
  //   let obj = accountObj;
  //   if (countI > 0) {
  //     console.log('here comes add rewards to hotspot in useState');
      
  //     console.log(hotspotsRewards);
  //     addRewardsToHotspot( countI - 1 );

  //     setCount((prevCount) => prevCount  +1 );
      
  //     if (index == obj?.hotspots?.length) { 
  //       console.log('count I = hotspot.length go to final action acc to LS')
  //       setCountI(0); 
  //       setCount(0);
  //       setMainButtonIsClickedFinal(true); 
  //     }
  //   }
  // }, [hotspotAddress])

  // // useEffect(() => {
  // //   if (count > 0 ) {
  // //     addRewardsToHotspot(count - 1);
  // //      setCount((prevCount) => prevCount  +1 ); 
  // //     console.log(hotspotsRewards);
  // //   }
  // // }, [hotspotsRewards])

  // useEffect(() => {
  //   if (mainButtonIsClickedFinal == true) {
  //     addAccObjToLocalStorage(accountObj);

  //     setMainButtonIsClickedFinal(false);
  //   }
  // }, [mainButtonIsClickedFinal])

  // async function addWalletToAccObj( ) {
  //   let array = accountObj;
  //   array = {...array, AccountAddress: walletInputField};
  //   setAccountObj(array)
  //   console.log('wallet address set')
    
  // }

  // async function addHotspotsToHotspots() {
  //   const array = myHotspots?.data;
  //   if (array.length) {
  //   console.log(array)
  //   setHotspots(array);
  //   console.log(hotspots)
  // }
  //   console.log('hotspots added to hotspots');
  // }

  // const addHotspotsToAccObj = () => {
  //   let array = accountObj;
  //   array = {...array, hotspots: hotspots} 
  //   console.log(hotspots)
  //   setAccountObj(array);
  //   console.log(accountObj)   
  //   console.log('hotspots added to accObj');
  // }

  // const addHotspotObjToHotspots = (hotspotObj, i) => {
  //   let array = accountObj;
  //   let array2 = array.hotspots;
  //   array2 = [...array2, {i: hotspotObj}];
  //   console.log(i)
  //   array = {...array, hotspots: array2} 
  //   setAccountObj(array);
  //   console.log('hotspotObjAddedToHotspots')
  // }

  // const addRewardsToAccount = () => {
  //   const array = accountObj;
  //   array.rewardsAllTime = accountRewardsAllTime;
  //   array.rewardsWeek = accountRewardsWeek;
  //   array.rewardsMonth = accountRewardsMonth;
  //   array.rewardsYear = accountRewardsYear;
  //   setAccountObj(array);
  //   console.log('rewardsAllTime added to account')
  // }

  // const addRewardsToHotspot = (i) => {
  //   const array = accountObj;
  //   let array2 = hotspotsRewards;
  //   console.log(array2)
  //   console.log(i)
  //   if ( array?.hotspots[i]?.rewardsAllTime != hotspotsRewards ) {
  //     array.hotspots[i].rewardsAllTime = array2;
  //   };
  //   console.log('adding rewards to hotspot')
  //   setAccountObj(array);
  // }


  // const addAccObjToLocalStorage = (accountObj) => {
  //   const object = accountObj;
  //   localStorage.setItem('Account', JSON.stringify(object));
  //   console.log('add accountObj to Local storage')
  // }

  const SubmitWallet = (walletInputField) => {
    // addWalletToAccObj(walletInputField, addHotspotsToHotspots);
    // \/ this function needs to wait till myHotspots has data
    // setTimeout(addHotspotsToHotspots(hotspots), 100);
    setTimeout(setMainButtonIsClicked(true), 1000);
    // setTimeout(addHotspotsToAccObj([...hotspots]), 300);

    // for (let i = 0; i < accountObj.hotspots.length; i++) {
    //   let obj = accountObj.hotspots[i];
    //   let index = i;
    //   obj = { ...obj, hostAddress: '', hostShare: 0, rewardsAllTime: [], rewardsYear: [], rewardsMonth: [], rewardsWeek: [] };
    //   setTimeout(addHotspotObjToHotspots(obj, index), 500);
    // }
    
    // // now comes the part for fetching the reward data for the AccountAddress
    // addRewardsToAccount();
    // // setCount(1)
    // console.log(accountObj);



    // then comes the part for fetching the reward data per hotspot
    // accountObj.hotspots.map((hotspot) => {setHotspotAddress( (value) => ({address: `${hotspot.address}`})); addRewardsToHotspot(accountObj.hotspots.indexOf(hotspot) );console.log(hotspotAddress) })
    // for (let i = 0; i < accountObj.hotspots.length; i ++) {
    //   let index = i;
    //   console.log(index)
    //   setTimeout(setHotspotAddressFunction(index), i*30000)
      
    // }
    
    
  }


  const getAccountAddressFromLS = () => {
    const data = localStorage.getItem('Account');
    if (data) {
      return JSON.parse(data);
    }
  }

  if (isFetching) return 'loading...';



  return (
    <>
      <Input.Group compact>
        <Input style={{ width: 'calc(50% - 00px)', borderRadius: '20px', borderColor: '#ffffff', margin: '8px', boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)" }} defaultValue='Enter your Helium wallet' onChange={(e) => setWalletInputField(e.target.value)} ></Input>
        <Button type='primary' style={{ borderRadius: '20px', borderColor: '#ff8600', margin: '8px', color: '#f1f2f6', background: '#ff8600', boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)" }} onClick={(e) => SubmitWallet(walletInputField)} >Submit</Button>
      </Input.Group>
      <Title level={2} > Your helium stats </Title>
      <Row>
        <Col span={12}><Statistic title='Total HNT Earned' value={accountObj?.rewardsAllTime?.data?.total} /></Col>
        <Col span={12}><Statistic title='Total HNT Balance' value={22} /></Col>
        <Col span={12}><Statistic title='Total Hotspots' value={accountObj?.hotspots?.length} /></Col>
        <Col span={12}><Statistic title='Total Paid Out' value={214.5} /></Col>
        <Col span={12}><Statistic title='Percentage Paid Out' value={96} /></Col>
      </Row>
      {/* <p>
      submit ->
      </p>
      <p>
        stateAccountObj.accountAddress = AccountAddress
      </p>
      <p>
        data = getHotspotsApi(AccountAddress)<br />
        stateAccountObj.hotspots = data<br />
      for (i = 0; i  hotspotsRewards.length; i ++ ) =><br />
        stateAccountObj.hotspots[i] push ( hostAddress: '', hostShare: '', allTimeRewards: 0,  )
      </p>
      <p>
        data2 = getAccountRewards(alltime, 7d, 30d, 52w)<br />
        stateAccountObj.rewards = data2
      </p> */}
      {/* <p>
        timeFrameList = [alltime, 7d, 30d, 52w]<br />
        data3 = getHotspotRewards(hotspotAddress, timeframe)<br />
      for (i) => hotspotAddress = accountObj.hotspots[i].hotspotAddress <br />
        for (i2 = 0; i2 smallerthan 3; i2 ++) => timeframe = timeFrameList[i2] <br />
        stateAccountObj.hotspot[i].rewards[i2] = data3<br />
        (allTime, 7d, 30d, 52w)
      </p>
      <p>
        getAccountTransactions()

      </p>
      <p>
      if (localstorage. account = empty) => setLocalStorage(stateAccountObj)
      </p> */}
      <Row gutters={[32, 32]}  >
        {/* <Col xs={24} sm={8} lg={6} >
          <Card style={{ background: '#ffffff', borderRadius: 20, margin: 5, padding: 20, width: '95%', boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)" }}  >
            <div >
              <p>Total HNT Earned</p>
              <p>{accountObj.rewardsAllTime?.data?.total}</p>
              <p>${accountObj.rewardsAllTime?.data?.total * 25}</p>
            </div>
          </Card>
        </Col> */}
        <Col xs={24} sm={24} lg={12} type="flex" align="middle">
          <div style={{padding: 5}}>

            <Card style={{ background: '#ffffff', borderRadius: 20, marginBottom: 15, margin: 0, padding: 5, width: '99%', boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)"}} >
              <div style={{ background: '#ffffff', borderRadius: 20, margin: 5, padding: 10, width: '99%' }}>
                <p>Earnings 1.53 HNT $42.16</p>
                
                <Row>
                  <BarChart accountObj={accountObj} timeperiod={earningsPeriod}  />
                </Row>
                <br />
                <Row justify="space-around" align="middle"> <Button style={buttonStyle} onClick={() => setEarningsPeriod('7d') }>7d</Button> <Button style={buttonStyle} onClick={() => setEarningsPeriod('30d') }>30d</Button> <Button style={buttonStyle} onClick={() => setEarningsPeriod('52w') }>52w</Button> </Row>
              </div>
            </Card>
          </div>
        </Col>
      
        {/* <Col xs={24} sm={8} lg={6}>
        <Card  style={{ background: '#ffffff', borderRadius: 20, margin: 5, padding: 20, width: '95%', boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)" }} >
        <div style={{ background: '#ffffff', borderRadius: 20, margin: 5, padding: 0, width: '95%' }}>
        <p>Hotspots</p>
        <p>{accountObj?.hotspots?.length}</p>
        </div>
        </Card>
        </Col> */}
        <Col xs={24} sm={24} lg={12} type="flex" align="middle">
          <div style={{padding: 5}}>
            <Card style={{ background: '#ffffff', borderRadius: 20, marginBottom: 15, margin: 0, padding: 5, width: '99%', boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)" }}>
              <div style={{ background: '#ffffff', borderRadius: 20, margin: 5, padding: 0, width: '95%' }}>
                <Row>
                  <BarChart2 accountObj={accountObj}  />
                </Row>
                <br />
                <Row justify="space-around" align="middle"> <Button style={buttonStyle}>7d</Button><Button style={buttonStyle}>30d</Button><Button style={buttonStyle}>52w</Button></Row>
                <p>how much each hotspot has earned in the last 24H, 7d, 30, 52w</p>
              </div>
            </Card>
          </div>  
        </Col>
      </Row>
      <br />
      <div style={{ background: '#ffffff', borderRadius: 20, margin: 0, padding: 50, width: '99%' }}>
        <p>Transactions</p>

      </div>
      <br />
      <br />
      <Row padding={200} gutter={[32, 32]}>

        {accountObj?.accountRolesCount?.data ? Object.keys( accountObj.accountRolesCount.data).map((role) => 
        accountObj.accountRolesCount.data[role] > 0 ?
        <Col>
          <Card style={cardStyle}>
            <div>
              <p>{role}: {accountObj.accountRolesCount.data[role]} </p>
            </div>
          </Card>
        </Col>
        : null
        ) : <p> theres no roles count</p>}
      </ Row>
      {/* <Title level={2} className='heading'>Global Crypto Stats</Title>
      <Row>
        <Col span={12}><Statistic title='Total Cryptocurrencies' value={globalStats.total} /></Col>
        <Col span={12}><Statistic title='Total Exchanges' value={millify(globalStats.totalExchanges)} /></Col>
        <Col span={12}><Statistic title='Total Marketcap' value={millify(globalStats.totalMarketCap)} /></Col>
        <Col span={12}><Statistic title='Total 24h Volume' value={millify(globalStats.total24hVolume)} /></Col>
        <Col span={12}><Statistic title='Total Markets' value={millify(globalStats.totalMarkets)} /></Col>
      </Row> */}
      {/* <div className='home-heading-container'>
        <Title level={2} className='home-title'>Top 10 Cryptocurrencies in the World</Title>
        <Title level={3} className='show-more'><Link to='/cryptocurrencies'>Show More</Link></Title>
      </div> */}
      {/* <Cryptocurrencies simplified /> */}
      {/* <div className='home-heading-container'>
        <Title level={2} className='home-title'>Latest Crypto News</Title>
        <Title level={3} className='show-more'><Link to='/news'>Show More</Link></Title>
      </div> */}
      {/* <News simplified /> */}
    </>
  )
}

export default Homepage