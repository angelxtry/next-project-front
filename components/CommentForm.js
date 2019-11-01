import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Input } from 'antd';

import { ADD_COMMENT_REQUEST } from '../reducers/post';

const CommentForm = ({ post }) => {
  const [commentText, setCommentText] = useState('');
  const { isLoggedIn } = useSelector((state) => state.user);
  const { isAddedComment, isAddingComment } = useSelector(
    (state) => state.post
  );
  const dispatch = useDispatch();

  const onSubmitComment = useCallback(
    (e) => {
      e.preventDefault();
      if (!isLoggedIn) {
        return alert('Plz login.');
      }
      return dispatch({
        type: ADD_COMMENT_REQUEST,
        payload: {
          postId: post.id,
          content: commentText
        }
      });
    },
    [isLoggedIn, commentText]
  );

  useEffect(() => {
    setCommentText('');
  }, [isAddedComment]);

  const onChangeCommentText = useCallback((e) => {
    setCommentText(e.target.value);
  }, []);

  return (
    <Form onSubmit={onSubmitComment}>
      <Form.Item>
        <Input.TextArea
          rows={4}
          value={commentText}
          onChange={onChangeCommentText}
        />
      </Form.Item>
      <Button type="primary" htmlType="submit" loading={isAddingComment}>
        Add Comment
      </Button>
    </Form>
  );
};

export default CommentForm;
