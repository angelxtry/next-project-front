import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Avatar } from 'antd';

import PostCard from '../components/PostCard';
import { LOAD_USER_POSTS_REQUEST } from '../reducers/post';
import { LOAD_OTHER_USER_REQUEST } from '../reducers/user';

const user = ({ id }) => {
  const { mainPosts } = useSelector((state) => state.post);
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: LOAD_OTHER_USER_REQUEST,
      payload: { id }
    });
    dispatch({
      type: LOAD_USER_POSTS_REQUEST,
      data: id
    });
  }, [id]);

  return (
    <div>
      {userInfo ? (
        <Card
          actions={[
            <div key="twit">
              짹짹 <br /> {userInfo.Posts}
            </div>,
            <div key="following">
              팔로잉 <br /> {userInfo.Followings}
            </div>,
            <div key="follower">
              팔로워 <br /> {userInfo.Followers}
            </div>
          ]}
        >
          <Card.Meta
            avatar={<Avatar>{userInfo.nickname[0]}</Avatar>}
            title={userInfo.nickname}
          />
        </Card>
      ) : null}
      {mainPosts.map((c, i) => (
        <PostCard key={i} post={c} />
      ))}
    </div>
  );
};

user.getInitialProps = async (context) => {
  return { id: context.query.id };
};

export default user;
