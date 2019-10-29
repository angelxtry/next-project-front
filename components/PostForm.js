import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button } from 'antd';

import { ADD_POST_REQUEST } from '../reducers/post';

const PostForm = () => {
  const [text, setText] = useState('');
  const { isAddedPost, isAddingPost } = useSelector((state) => state.post);
  
  const dispatch = useDispatch();

  const onChangeText = useCallback((e) => {
    setText(e.target.value);
  }, []);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!text || !text.trim()) {
        return alert('Plz wrtie content.');
      }
      dispatch({ type: ADD_POST_REQUEST, payload: text });
    },
    [text]
  );

  useEffect(() => {
    if (isAddedPost) {
      setText('');
    }
  }, [isAddedPost]);

  return (
    <Form
      onSubmit={onSubmit}
      encType="multipart/form-data"
      style={{ margin: '10px 0 20px' }}
    >
      <Input.TextArea
        maxLength={140}
        placeholder="기분을 적어주세요."
        value={text}
        onChange={onChangeText}
      />
      <div>
        <Input type="file" multiple hidden />
        <Button>Image Upload</Button>
        <Button
          type="primary"
          style={{ float: 'right' }}
          htmlType="submit"
          loading={isAddingPost}
        >
          write
        </Button>
      </div>
    </Form>
  );
};

export default PostForm;
