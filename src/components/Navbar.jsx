import React, { useState, useEffect } from 'react';
import { Button, Menu, Typography, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined, MenuOutlined } from '@ant-design/icons/lib/icons';

import icon from '../images/cryptocurrency.png';

const Navbar = () => {
    const [ activeMenu, setActiveMenu ] = useState(true);
    const [ screenSize, setScreenSize ] = useState(null);

    useEffect(() => {
        const handleResize = () => setScreenSize(window.innerWidth);

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => window.removeEventListener('resize', handleResize);

    }, []);

    useEffect(() => {
        if (screenSize < 768) {
            setActiveMenu(false);
        } else {
            setActiveMenu(true);
        }
    }, [screenSize]);

    return (
        <div className='nav-container'>
            <div className='logo-container'>
                <Avatar src={icon} size='large' />
                <Typography.Title  level={2} className='logo' >
                    <Link style={{color: '#f1f2f6'}} to='/'> WalleyDash </Link>
                </Typography.Title>
                <Button className='menu-control-container' onClick={() => setActiveMenu(true)}>
                    <MenuOutlined />
                </Button>
            </div>

            {activeMenu && (

                <Menu style={{background: '#27187e'}} theme='dark'>
                    <Menu.Item key={'home'} icon={<HomeOutlined />}>
                        <Link style={{color: '#aeb8fe'}} to='/'>Home</Link>
                    </Menu.Item>
                    <Menu.Item key={'cryptocurrencies'} icon={<FundOutlined />}>
                        <Link style={{color: '#aeb8fe'}} to='/cryptocurrencies'>Cryptocurrencies</Link>
                    </Menu.Item>
                    <Menu.Item key={'helium'} icon={<MoneyCollectOutlined />}>
                        <Link style={{color: '#aeb8fe'}} to='/helium'>Helium</Link>
                    </Menu.Item>
                    <Menu.Item key={'news'} icon={<BulbOutlined />}>
                        <Link style={{color: '#aeb8fe'}} to='/news'>News</Link>
                    </Menu.Item>

                </Menu> 

            )}
            
        </div>
    )
}

export default Navbar