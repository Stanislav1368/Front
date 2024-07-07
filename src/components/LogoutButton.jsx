import React from 'react';
import { Button } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';

const LogoutButton = () => {
  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <Button style={{ fontSize: 18, fontWeight: "bolder" }} icon={<LogoutOutlined style={{ fontSize: "28px" }} />} type="danger" onClick={handleLogout}>
      Выйти
    </Button>
  );
};

export default LogoutButton;