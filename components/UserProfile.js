import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Avatar, Button } from 'antd';

import { LOG_OUT } from '../reducers/user';

const UserProfile = () => {
  const dispatch = useDispatch();
  const onLogout = useCallback(() => {
    dispatch({
      type: LOG_OUT
    })
  }, []);

  const { me } = useSelector((state) => state.user);

  return (
    <Card
      actions={[
        <div key="my-cafe">
          My Cafe
          <br />
          {me.myCafes.length}
        </div>
      ]}
    >
      <Card.Meta
        avatar={<Avatar>{me.nickname[0]}</Avatar>}
        title={me.nickname}
      />
      <Button onClick={onLogout}>Logout</Button>
    </Card>
  );
};

export default UserProfile;
