import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Avatar, Button } from 'antd';

import { LOG_OUT_REQUEST } from '../reducers/user';

const UserProfile = () => {
  const dispatch = useDispatch();
  const onLogout = useCallback(() => {
    dispatch({
      type: LOG_OUT_REQUEST
    });
  }, []);

  const { me } = useSelector((state) => state.user);

  return (
    <Card
      actions={[
        <div key="twit">
          {' '}
          짹짹 <br /> {me.Posts.length}{' '}
        </div>,
        <div key="following">
          {' '}
          팔로잉 <br /> {me.Followings.length}{' '}
        </div>,
        <div key="follower">
          {' '}
          팔로워 <br /> {me.Followers.length}{' '}
        </div>
      ]}
    >
      {/* <Card
      actions={[
        <div key="my-cafe">
          My Cafe
          <br />
          {me.myCafes.length}
        </div>
      ]}
    > */}
      <Card.Meta
        avatar={<Avatar>{me.nickname[0]}</Avatar>}
        title={me.nickname}
      />
      <Button onClick={onLogout}>Logout</Button>
    </Card>
  );
};

export default UserProfile;
