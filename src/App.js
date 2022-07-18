import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { Layout, Typography, Space, Col } from 'antd';

import { Navbar, Helium, Homepage, Cryptocurrencies, News, CryptoDetails } from './components/';
import './App.css';

const App = () => {
    return (
        <div className='app'>
            <div className='navbar'>
                <Navbar />
            </div>
            
            <div className='main'>
                <Layout>
                    <div style={{background: '#f1f2f6'}} className='routes'>
                        
                        <Switch>
                            <Route exact path='/'>
                                <Homepage />
                            </Route>
                            <Route exact path='/helium'>
                                <Helium />
                            </Route>
                            <Route exact path='/cryptocurrencies'>
                                <Cryptocurrencies />
                            </Route>
                            <Route exact path='/crypto/:coinUuid'>
                                <CryptoDetails />
                            </Route>
                            <Route exact path='/news'>
                                <News />
                            </Route>
                        </Switch>
                      
                    </div>
                </Layout>
                <div className='footer'>
                    <Typography.Title level={5} style={{ color: 'white', textAlign: 'center' }}>
                        WalleyDash <br />
                        All rights reserves
                    </Typography.Title>
                    <Space>
                        <Link to='/'>Home</Link>
                        <Link to='/helium'>Helium</Link>
                        <Link to='/news'>News</Link>
                    </Space>
                </div>
            </div>
        </div>
    );
}

export default App