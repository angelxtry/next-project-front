import React, { useState, useCallback, memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import { Form, Input, Button, Checkbox } from 'antd';

import useInput from '../components/useInput';
import { SIGN_UP_REQUEST } from '../reducers/user';

const TextInput = memo(({ name, value, onChange }) => {
  return <Input name={name} required value={value} onChange={onChange} />;
});

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

  const disaptch = useDispatch();

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (passwordError) {
        return;
      }
      if (!term) {
        return setTermError(true);
      }
      disaptch({
        type: SIGN_UP_REQUEST,
        payload: { email, nickname, password }
      });
      console.log({ email, nickname, password, passwordCheck, term });
    },
    [email, nickname, password, passwordCheck, term, passwordError, termError]
  );

  const { isLoggedIn } = useSelector((state) => state.user);
  useEffect(() => {
    if (isLoggedIn) {
      Router.push('/');
    }
  }, [isLoggedIn]);

  return (
    <div>
      <Form onSubmit={onSubmit} style={{ padding: '10px' }}>
        <div>
          <label htmlFor="user-email">Email</label>
          <br />
          <TextInput name="user-email" value={email} onChange={onChangeEmail} />
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
    </div>
  );
};

export default signup;
