import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { ReadOutlined, SyncOutlined, TeamOutlined } from '@ant-design/icons';

const { Sider } = Layout;

const Sidebar = () => {
  const [selectedKey, setSelectedKey] = useState('1');
  const location = useLocation();

  const handleMenuClick = (e) => {
    setSelectedKey(e.key);
  };

  React.useEffect(() => {
    switch (location.pathname) {
      case '/books':
        setSelectedKey('1');
        break;
      case '/rental':
        setSelectedKey('2');
        break;
      case '/rentors':
        setSelectedKey('3');
        break;
      default:
        setSelectedKey('1');
    }
  }, [location.pathname]);

  return (
    <Sider style={{ background: 'white' }} width={280}>
      <Menu
        theme="light"
        mode="inline"
        selectedKeys={[selectedKey]}
        onClick={handleMenuClick}
      >
        <Menu.Item key="1" icon={<ReadOutlined style={{ fontSize: "28px" }}/>}>
          <Link to="/books" style={{fontSize: 18, fontWeight: 'bolder'}}>Книги</Link>
        </Menu.Item>
        <Menu.Item   key="2" icon={<SyncOutlined style={{ fontSize: "28px" }}></SyncOutlined> }>
          <Link to="/rental"  style={{fontSize: 18, fontWeight: 'bolder'}}>Аренда</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<TeamOutlined style={{ fontSize: "28px" }}></TeamOutlined>}>
          <Link to="/rentors" style={{fontSize: 18, fontWeight: 'bolder'}}>Клиенты</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
