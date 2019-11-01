import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Icon, Button, Avatar } from 'antd';

import PostCardContent from './PostCardContent';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import PostImages from './PostImages';
import {
  LOAD_COMMENTS_REQUEST,
  LIKE_POST_REQUEST,
  UNLIKE_POST_REQUEST,
  RETWEET_REQUEST
} from '../reducers/post';
import { FOLLOW_USER_REQUEST } from '../reducers/user';

const PostCard = ({ post }) => {
  const [commentFormOpened, setCommentFormOpened] = useState(false);
  const dispatch = useDispatch();
  const onToggleComment = useCallback(() => {
    setCommentFormOpened((prev) => !prev);
    if (!commentFormOpened) {
      dispatch({
        type: LOAD_COMMENTS_REQUEST,
        payload: { postId: post.id }
      });
      console.log('setCommentFormOpened: ', post.id);
    }
  }, []);

  const { isLoggedIn, me } = useSelector((state) => state.user);
  const liked =
    isLoggedIn && post.Likers && post.Likers.find((v) => v.id === me.id);
  const onToggleLike = useCallback(() => {
    if (!isLoggedIn) {
      return alert('Plz Login');
    }
    if (liked) {
      dispatch({
        type: UNLIKE_POST_REQUEST,
        payload: post.id
      });
    } else {
      dispatch({
        type: LIKE_POST_REQUEST,
        payload: post.id
      });
    }
  }, [isLoggedIn, post && post.id, liked]);

  const onRetweet = useCallback(() => {
    if (!isLoggedIn) {
      return alert('로그인이 필요합니다.');
    }
    return dispatch({
      type: RETWEET_REQUEST,
      payload: post.id
    });
  }, [isLoggedIn, post && post.id]);

  const onFollow = useCallback(
    (userId) => () => {
      dispatch({
        type: FOLLOW_USER_REQUEST,
        data: userId
      });
    },
    []
  );

  const onUnfollow = useCallback(
    (userId) => () => {
      dispatch({
        type: UNFOLLOW_USER_REQUEST,
        data: userId
      });
    },
    []
  );

  return (
    <div>
      <Card
        key={+post.createdAt}
        cover={
          post.Images && post.Images[0] && <PostImages images={post.Images} />
        }
        actions={[
          <Icon type="retweet" key="retweet" onClick={onRetweet} />,
          <Icon
            type="heart"
            key="heart"
            theme={liked ? 'twoTone' : 'outlined'}
            twoToneColor="#eb2f96"
            onClick={onToggleLike}
          />,
          <Icon type="message" key="message" onClick={onToggleComment} />,
          <Icon type="ellipsis" key="ellipsis" />
        ]}
        title={
          post.RetweetId ? `${post.User.nickname}님이 리트윗하셨습니다.` : null
        }
        extra={
          !me || post.User.id === me.id ? null : me.Followings &&
            me.Followings.find((v) => v.id === post.User.id) ? (
            <Button onClick={onUnfollow(post.User.id)}>언팔로우</Button>
          ) : (
            <Button onClick={onFollow(post.User.id)}>팔로우</Button>
          )
        }
      >
        {post.RetweetId && post.Retweet ? (
          <Card
            cover={
              post.Retweet.Images[0] && (
                <PostImages images={post.Retweet.Images} />
              )
            }
          >
            <Card.Meta
              avatar={
                <Link
                  href={{
                    pathname: '/user',
                    query: { id: post.Retweet.User.id }
                  }}
                  as={`/user/${post.Retweet.User.id}`}
                >
                  <a>
                    <Avatar>{post.Retweet.User.nickname[0]}</Avatar>
                  </a>
                </Link>
              }
              title={post.Retweet.User.nickname}
              description={<PostCardContent postData={post.Retweet.content} />} // a tag x -> Link
            />
          </Card>
        ) : (
          <Card.Meta
            avatar={
              <Link
                href={{ pathname: '/user', query: { id: post.User.id } }}
                as={`/user/${post.User.id}`}
              >
                <a>
                  <Avatar>{post.User.nickname[0]}</Avatar>
                </a>
              </Link>
            }
            title={post.User.nickname}
            description={<PostCardContent postData={post.content} />} // a tag x -> Link
          />
        )}{' '}
      </Card>
      {commentFormOpened && (
        <>
          <CommentForm post={post} />
          <CommentList post={post} />
        </>
      )}
    </div>
  );
};

export default PostCard;
