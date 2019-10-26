import React from 'react';
import { Menu, Input } from 'antd';

const Layout = ({ children }) => {
  return (
    <div>
      <Menu mode="horizontal">
        <Menu.Item key="home">Home</Menu.Item>
        <Menu.Item key="profile">Profile</Menu.Item>
        <Menu.Item key="search">
          <Input.Search enterButton style={{ verticalAlign: 'middle' }} />
        </Menu.Item>
      </Menu>
      {children}
    </div>
  );
};

export default Layout;
