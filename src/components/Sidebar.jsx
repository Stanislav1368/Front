import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';

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
    <Sider style={{ background: 'white' }} width={220}>
      <Menu
        theme="light"
        mode="inline"
        selectedKeys={[selectedKey]}
        onClick={handleMenuClick}
      >
        <Menu.Item key="1">
          <Link to="/books">Книги</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/rental">Аренда</Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="/rentors">Клиенты</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
