import '../Styles/DefaultLayout.css';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import React from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
    LogoutOutlined,
    HomeOutlined,
    CopyOutlined,
    UnorderedListOutlined, 
    ShoppingCartOutlined,
  } from '@ant-design/icons';
  import {  useSelector } from 'react-redux/es/hooks/useSelector';
  import { Layout, Menu, Button, theme } from 'antd';
  const { Header, Sider, Content } = Layout;

  const DefaultLayout = ({ children }) => {
    const {cartItems}= useSelector(state => state.rootReducer)
    const [collapsed, setCollapsed] = useState(false);
    const {
      token: { colorBgContainer },
    } = theme.useToken();
// useEffect is using to get the values from the localStorage
    useEffect(()=>{
      localStorage.setItem('cartItems', JSON.stringify(cartItems))
    },[cartItems])
    console.log(cartItems,"cart items");

  // useNavigate hook is used to navigate
  const navigate= useNavigate()

    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical">
            <h3 className='text-center text-light font-weight-semibold mt-2'>Billing App</h3>
          </div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={window.location.pathname}
      
          >
            <Menu.Item key={1} icon={<HomeOutlined />}>
              <Link to="/" className='menu-Link' >Home</Link>
            </Menu.Item>
            <Menu.Item key="/bills" icon={<CopyOutlined />}>
              <Link to="/bills" className='menu-Link' >Bills</Link>
            </Menu.Item>
            <Menu.Item key="/items" icon={<UnorderedListOutlined />}>
              <Link to="/items" className='menu-Link' >Items</Link>
            </Menu.Item>
            <Menu.Item key="/customers" icon={<UserOutlined />}>
              <Link to="/customers" className='menu-Link' >Customer</Link>
            </Menu.Item>
            <Menu.Item key="/logout" icon={<LogoutOutlined />}>
             Logout
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
            <div className="cart-items" onClick={()=>navigate('/cart')}>
              <p className='cart-item-num'>{cartItems.length}</p>
              <ShoppingCartOutlined /> 
             </div>
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            { children }
          </Content>
        </Layout>
      </Layout>
    );
  };
  export default DefaultLayout;