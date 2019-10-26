import React, { useState, useCallback } from 'react';
import Head from 'next/head';
import { Form, Input, Button, Checkbox } from 'antd';

import Layout from '../components/Layout';
import useInput from '../components/useInput';

const signup = () => {
  const [email, onChangeEmail] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [term, setTerm] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [termError, setTermError] = useState(false);

  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordError(password !== e.target.value);
      setPasswordCheck(e.target.value);
    },
    [password]
  );

  const onChangeTerm = useCallback((e) => {
    setTermError(false);
    setTerm(e.target.checked);
  }, []);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (passwordError) {
        return;
      }
      if (!term) {
        return setTermError(true);
      }
      console.log({ email, nickname, password, passwordCheck, term });
    },
    [email, nickname, password, passwordCheck, term, passwordError, termError]
  );

  return (
    <div>
      <Head>
        <title>C And C</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.23.6/antd.min.css"
        />
      </Head>
      <Layout>
        <Form onSubmit={onSubmit} style={{ padding: '10px' }}>
          <div>
            <label htmlFor="user-email">Email</label>
            <br />
            <Input
              name="user-email"
              required
              value={email}
              onChange={onChangeEmail}
            />
          </div>
          <div>
            <label htmlFor="user-nickname">Nickname</label>
            <br />
            <Input
              name="user-nickname"
              required
              value={nickname}
              onChange={onChangeNickname}
            />
          </div>
          <div>
            <label htmlFor="user-password">Password</label>
            <br />
            <Input
              name="user-password"
              required
              value={password}
              onChange={onChangePassword}
            />
          </div>
          <div>
            <label htmlFor="user-password-check">Password check</label>
            <br />
            <Input
              name="user-password-check"
              required
              type="password"
              value={passwordCheck}
              onChange={onChangePasswordCheck}
            />
            {passwordError && (
              <div style={{ color: 'red' }}>Passwords do not match.</div>
            )}
          </div>
          <div>
            <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>
              I agree.
            </Checkbox>
            {termError && (
              <div style={{ color: 'red' }}>You must agree to the terms</div>
            )}
          </div>
          <div>
            <Button type="primary" htmlType="submit">
              Signup
            </Button>
          </div>
        </Form>
      </Layout>
    </div>
  );
};

export default signup;
