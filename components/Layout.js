import React, { useEffect } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Menu, Input, Row, Col } from 'antd';

import LoginForm from './LoginForm';
import UserProfile from './UserProfile';
import { LOAD_USER_REQUEST } from '../reducers/user';

const Layout = ({ children }) => {
  const { isLoggedIn } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoggedIn) {
      dispatch({
        type: LOAD_USER_REQUEST
      });
    }
  }, []);

  return (
    <div>
      <Menu mode="horizontal">
        <Menu.Item key="home">
          <Link href="/index">
            <a>Home</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="profile">
          <Link href="/profile">
            <a>Profile</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="search">
          <Input.Search enterButton style={{ verticalAlign: 'middle' }} />
        </Menu.Item>
      </Menu>
      <Row gutter={10}>
        <Col xs={24} md={6}>
          {isLoggedIn ? <UserProfile /> : <LoginForm />}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}></Col>
      </Row>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node
};

export default Layout;
