import React, { useCallback } from 'react';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { Form, Input, Button } from 'antd';

import useInput from '../components/useInput';
import { LOG_IN_SUCCESS } from '../reducers/user';

const LoginForm = () => {
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');

  const dispatch = useDispatch();
  const onSubmit = useCallback((e) => {
    e.preventDefault();
    dispatch({
      type: LOG_IN_SUCCESS
    });
  }, []);

  return (
    <Form onSubmit={onSubmit} style={{ padding: '10px' }}>
      <div>
        <label htmlFor="user-email">Email</label>
        <Input
          name="user-email"
          required
          value={email}
          onChange={onChangeEmail}
        />
      </div>
      <div>
        <label htmlFor="user-password">Password</label>
        <Input
          name="user-password"
          type="password"
          required
          value={password}
          onChange={onChangePassword}
        />
      </div>
      <div style={{ marginTop: '10px' }}>
        <Button type="primary" htmlType="submit" loading={false}>
          Login
        </Button>
        <Link href="/signup">
          <Button>Signup</Button>
        </Link>
      </div>
    </Form>
  );
};

export default LoginForm;
