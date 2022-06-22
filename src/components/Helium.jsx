import React, { useState, useEffect, Component } from 'react';
import { Col, Row, Typography, Card, Button, List, Grid, Divider, Space, Input } from 'antd';
import { Line, Chart  } from 'react-chartjs-2';
import LineChart from './LineChart';
import DoughnutChart from './DoughnutChart';
import BarChart from './BarChart';
import HorizontalBarChart from './HorizontalBarChart'; 
import { useGetHeliumSupplyQuery, useGetHeliumHotspotsQuery, useGetHeliumHotspotsRewardsAllTimeQuery } from '../services/heliumApi';

const { Text, Title } = Typography;

// input field for your wallet address
// on enter {
//   set accountobj.accountaddress
//   save accountobj to localstorage
// }
// on accountobj change {
//     display hotspots in list of cards
// }



const Helium = () => {
  const [myAdress, setMyAddress] = useState('');
  const [hotspotAddress, setHotspotAddress] = useState("");
  const [myHotspotData, setMyHotspotData] = useState([]);
  const { data } = useGetHeliumSupplyQuery();
  const { data: myHotspots, refetch } = useGetHeliumHotspotsQuery(myAdress);
  const { data: rewards } = useGetHeliumHotspotsRewardsAllTimeQuery(hotspotAddress);
  const style = { background: '#ffffff', borderRadius: "40px", padding: '8px', overflow: "hidden", elevation: '10',  boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)" }; 
  const [hotspots, setHotspots] = useState([]); 

  useEffect(() => {
    const filterMyHotspots = myHotspots?.data;
    setMyHotspotData(filterMyHotspots);
  }, [myHotspots]);

  useEffect(() => {
    
    const data = localStorage.getItem('Account');
    if (data) {
      setAccountObj( JSON.parse(data) );
    }
  
  },[])


  const [ accountObj, setAccountObj ] = useState({
    AccountAddress: '',
    hotspots: [],
    transactions: {
      allTransaction: [{}],
      ownerTransaction: [{}],
      payeeTransactions: [{}],
    },});
  const addWalletToAccObj = (title) => {
    const array = accountObj;
    array.AccountAddress = title;
    setAccountObj(array)
    console.log('wallet address set')}
    
  const addHotspotsToAccObj = (arrayHotpots) => {
    const array = accountObj;
    array.hotspots = arrayHotpots;
    setAccountObj(array);
  }

  const addHotspotsToHotspots = () => {
    const array = myHotspots.data;
    setHotspots(array);
  }

  
  const addAccObjToLocalStorage = (accountObj) => {
    const object = accountObj;
    localStorage.setItem('Account', JSON.stringify(object));
  }

  const forEveryHotspotAddSomething = (accountObj) => {
    for ( let i=0; i<accountObj.hotspots.length; i++) 
    {
      let obj = accountObj.hotspots[i];
      const array = accountObj.hotspots;
      if (obj.hostAddress == null) {
        obj = {...obj, hostAddress: '', hostShare: 0, rewardsYear: [], rewardsMonth: [], rewardsWeek: []}; }
      array[i]=obj; 
      setHotspots(array);
      addHotspotsToAccObj(array);
      console.log(accountObj)
    }
  }
    
  

  const onSubmitYourWalletClick = (e) => {
    addWalletToAccObj(myAdress)
    console.log('wallet addedd to acc obj', myAdress)

    
    addHotspotsToHotspots();
    addHotspotsToAccObj([...hotspots]);
    console.log(accountObj);
    refetch()
    for (let i = 0; i < accountObj.hotspots.length; i ++) {
      let obj = accountObj;
      let hotObj = accountObj.hotspots[i];
      hotObj = {...hotObj, hostAddress: hostAddressButton, hostShare: 0, rewardsYear: [], rewardsMonth: [], rewardsWeek: []}
      obj.hotspots[i] =hotObj;
      setAccountObj(obj)
    }
    // forEveryHotspotAddSomething(accountObj);
    
    addAccObjToLocalStorage(accountObj);
  }

 
  const onButtonClick = (e) => {
  }
  
  const [ hostAddressButton, setHostAddressButton ] = useState('');
  const changeHostAddress = ( hotspot,  hostAddressString) => {
    let array = [];
    let array2 = [];
    let index = accountObj.hotspots.indexOf(hotspot);
    console.log({index})
    setHotspotAddress(hotspot.address)
    
    array = accountObj; 
    array2 = array.hotspots[index];
    array2.hostAddress = hostAddressButton;
    array.hotspots[index] = array2;
    
    setAccountObj( array);
    console.log(accountObj);
  }
  
  const [hostShareButton, setHostShareButton] = useState(0);
  const changeHostShare = (hotspot) => {
    let array = [];
    let array2 = [];
    let index = accountObj.hotspots.indexOf(hotspot);
    console.log({index});
    array = accountObj;
    array2 = array.hostShare = hostAddressButton;
    array.hotspots[index] = array2;

    setAccountObj(array);
    console.log(accountObj);

  }
  
  
  return (
    <>
     
     <Title level={4} style={{margin: 8}}>Get() your hotspots</Title>
    <Row>
      <Space direction='vertical'>
      <Col span={24}>
      </Col>
      </Space>
    </Row>
    <Input.Group compact>
      <Input style={{ width: 'calc(50% - 00px)', borderRadius: '20px', borderColor: '#ffffff', margin: '8px', boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)" }} onChange={(e) => setMyAddress(e.target.value)} defaultValue="Enter your wallet address" />
      <Button type="primary" style={{borderRadius: '20px', borderColor: '#ff8600', margin: '8px', color: '#f1f2f6', background: '#ff8600', boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)"}} onClick={(e) => onSubmitYourWalletClick()}>Submit</Button>
    </Input.Group>
    <br />
    {/* <Divider orientation="left"><Button onClick={onButtonClick} >Get account hotspots</Button></Divider> */}
    <Row padding={200} gutter={[32, 32]}>
        {accountObj.hotspots.map(
          (hotspot) =>
          <Col key={hotspot.address} className="gutter-row" xs={24} sm={12} lg={8} >
          <Card style={style}>
          <Title align='center' level={4}>{hotspot.name}</Title>
          <BarChart  />
          <Row justify='space-around' align='center' span={24}> 
            <div />
            <Button style={{borderRadius: 20, borderColor: '#758bfd'}} span={8}>week</Button> 
            <Button style={{borderRadius: 20, borderColor: '#758bfd'}} span={8}>month</Button> 
            <Button style={{borderRadius: 20, borderColor: '#758bfd'}} span={8}>year</Button> 
            <div />
          </Row>
          <br />

          <Row  >
            <Col align='center' span={16}> <div >Total Earnings:</div> </Col> 
            <Col align='center' span={8}> <div>400 HNT</div> </Col>
          </Row>
          <br />
          <Row > 
            <Col  span={18} >
              <Row  >
                
                <Col style={{padding: 5}} span={2}> <div>Host:</div> </Col> 
                <Col span={1} > </Col>
                <Col style={{padding: 5}} span={21}> 
                
                  <div align={'center'} > 
                    <Input.Group   >
                      <Input style={{ width: 'calc(100% - 90px)', borderRadius: 20, boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)"  }} defaultValue={hotspot.hostAddress} onChange={(e ) => setHostAddressButton( e.target.value ) } />
                      <div style={{width: 20}} />
                      <Button  style={{background: '#ff8600', borderColor: '#ff8600', borderRadius: 20, boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)" }} type="primary" onClick={( ) => changeHostAddress(hotspot, hostAddressButton) }>Update</Button>
                    </Input.Group> 
                  </div> 
                </Col>
              </Row>
            </Col>
            <Col span={6}>
              <Row >
                <Col> <div style={{paddingTop: '15px' }} >Share:</div> </Col>
                {/* <Col> <div align='center'> <img style={{maxWidth: '50px', maxHeight:'50px'}} src= 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News'/></div> </Col> */}
                <DoughnutChart hostShare={hotspot.hostShare} />
              </Row>
            </Col>
          </Row>
         

          <Row  >
            <Col align='center' span={16}> <div >Paid out:</div> </Col> 
            <Col align='center' span={8}> <div>58 HNT </div> </Col>
          </Row>

          <Row  >
            <Col align='center' span={24}><div style={{height: 50}}><HorizontalBarChart hostShare={75} /> </div> </Col> 
            
          </Row>

          <Row  >
            <Col align='center' span={16}> <div >Still to pay out:</div> </Col> 
            <Col align='center' span={8}> <div>12 HNT</div> </Col>
          </Row>
          
        </Card>
      </Col>
      )}


    </Row>

    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />


    </>
  )   
  
}
export default Helium

//   return (
  //     <>
  
  //     <Button > update </Button>
  //       {/* <Row> <List> <Card><Title>hotspot</Title>, <Text> here should be some more</Text></Card></List></Row> */}
  //       <Row gutter={[32, 32]} className='crypto-card-container'>
  //         { myHotspots?.data?.map((hotspot, i) => (
    //           <Col xs={24} sm={12} lg={6}  key={i} >
    //           <Card hoverable className='crypto-card'>
    //             <div>
    
    //               <Title> someting {`${hotspot.name} `} </Title>,
    //               <br></br>,
    //               <p> somehting else this is a paragraph</p>,
    
    //               {/* <Chart barData=''> </Chart>,
    //               <Row> <button> </button> </Row>,
    //               <Row> <p> Total earned </p>, <p> 540 HNT</p> </Row>
    //               <Row> <p> Host: "hostAddress </p>, <p>Share:</p>, <Chart pieData=''> </Chart> </Row>,
    //               <p> Paid out: ... HNT</p>,
    //               <progressBar progressData=''> </progressBar>
  //             <p> Still to pay out: ... HNT </p> */}
  //             </div>
  
  //             </Card>
  //           </Col>
  
  
  //         )) }
  
  //       </Row>
  //     </>
  //     // <>
  //     // <div>
  //     //   <Col>
  //     //     <Row gutters={[32, 32]} className='crypto-card-container'>
  //     //       <Row xs={24} sm={12} lg={6}>
  //     //         {myHotspotData?.map((hotspot) => (
    //     //           <Card title={`${hotspot.name}`} hoverable >
    //     //             <p> hotspot name: {hotspot.name} </p>
    //     //             <p> total earnings: something something </p>
    //     //           </Card>
    //     //         ))}
    
    //     //       </Row>
    //     //     </Row>
    //     //   </Col>
    
    //     // </div>
    //     // </>
    //   )
    //  }
    
    // export default Helium
    
    
    
    
    
    // for (let i = myHotspotData?.length - 1; i >= 0; i--) {
      
      //   // AccountObj.hotspots.push(  myHotspotData[i].name);
      //   // AccountObj.hotspots.push(hotspotObj);
      
      // // AccountObj.hotspots =  
      // // { 
        // //     hotspotName:  myHotspotData.map( (id) => id.name  ).forEach,
  // //     hotspotAddress: myHotspotData.map( (id) => id.address  )
  // // }
  //   console.log('hotspotObj created');
  // }
  
  // console.log({myHotspotData})
  // console.log({myHotspots})
  // console.log({myHotspotDataDetail})
  






    // const [myHotspotDataDetail, setMyHotspotDataDetail] = useState([]);
  
    // const AccountObj = {
    //   AccountAddress: '13aik3sfNPtxHZuv4v6XQeLp5N9QG6qb4rY6rDEzfJJaxWdrERm',
    //   hotspots: [],
    //   transactions: {
    //       allTransaction: [{}],
    //       ownerTransaction: [{}],
    //       payeeTransactions: [{}],
    //   },
    // };
  
  
  // let filledArray = new Array(myHotspotData?.length);
  // let looped = false;
  
  // for(let i=0; i<filledArray.length;i++){
  //   if (looped != true) {if (myHotspotData != null) {filledArray[i] = {'hotspot': myHotspotData[i]}};
  //   let items: [];
  //   items = filledArray[i]?.hotspot;
  //     items = {... items, hostAddress:'', hostShare: 0}
  //   let array: [];
  //   array = AccountObj;
  //   array.hotspots[i]=items;
  //    AccountObj.hotspots[i] = items ; 
  //    if (i=filledArray.length -1) { looped = true }
  //   console.log('for loop looped')}
  // }
  
  // const mappy2 = [];
  // myHotspotData.map((id) => {
  // for (let i = myHotspotData.length - 1; i >= 0; i--) {
  //   AccountObj.hotspots[i].hotspotName = id.name } } );
  // console.log(mappy2, 'shitface');
  
  // for (let i = AccountObj.hotspots?.length - 1; i >= 0; i--) {
  //   // console.log(i);
  //   // // {myHotspotData.map( (id) => AccountObj.hotspots.i.hotspotName = id.name   )}
     
  //   // // mappy2.map( (map) => AccountObj.hotspots[i].hotspotName.push(map) )
    
  //   // console.log(AccountObj.hotspots);
  //   // // AccountObj.hotspots.hotspotAddress = myHotspotData[i].address;
  //   // console.log('hello2');
    
  // }
    // useEffect(() => {
           //   const filterMyHotspotData = 
    //   myHotspotData.map( (id) => id.name  ) 
    //   ;
    //   setMyHotspotDataDetail(filterMyHotspotData);   
    
    // }, [myHotspotData, AccountData]);