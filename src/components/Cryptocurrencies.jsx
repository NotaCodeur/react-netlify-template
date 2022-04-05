import React, { useState, useEffect } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd';

import LineChart from './LineChart';
import { useGetCryptoHistoryQuery } from '../services/cryptoApi';

import { useGetCryptosQuery } from '../services/cryptoApi';

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const coinUuid = '';

  const { data: coinHistory } = useGetCryptoHistoryQuery(coinUuid , '30d');

  useEffect(() => {
    const filteredData = cryptosList?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLowerCase()));

    setCryptos(filteredData);

  }, [cryptosList, searchTerm]);

  if (isFetching) return 'Loading...';

  return (
    <>
      {!simplified && (

        <div className='search-crypto'>
          <Input style={{borderRadius: 20, borderColor: '#ffffff', boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)"}} placeholder='Search Cryptocurrency' onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
      )}
      <Row gutters={[32, 32]} className='crypto-card-container'>
        {cryptos?.map((currency) => (
          
          <Col xs={24} sm={12} lg={6} className='crypto-card' key={currency.uuid}>
            <Link to={`/crypto/${currency.uuid}`}>
              <Card
                title={`${currency.rank}. ${currency.name}`}
                extra={<img className='crypto-image' src={currency.iconUrl} />}
                hoverable
                style={{borderRadius: 20, margin: 5, level: 4, boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)"}}
              >
                
                 {/* <LineChart coinHistory={coinHistory} currentPrice={millify(currency.price)} coinName={currency.name} /> */}
                <p>Price: {millify(currency.price)}</p>
                <p>Market Cap: {millify(currency.marketCap)}</p>
                <p>Daily Change: {millify(currency.change)}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default Cryptocurrencies