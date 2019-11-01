import React, { useCallback, useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button } from 'antd';

import {
  ADD_POST_REQUEST,
  UPLOAD_IMAGES_REQUEST,
  REMOVE_IMAGE
} from '../reducers/post';

const PostForm = () => {
  const [text, setText] = useState('');
  const { imagePaths, isAddedPost, isAddingPost } = useSelector(
    (state) => state.post
  );
  const imageInput = useRef();

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
      const formData = new FormData();
      imagePaths.forEach((i) => {
        formData.append('image', i);
      });
      formData.append('content', text);
      dispatch({
        type: ADD_POST_REQUEST,
        payload: formData
      });
    },
    [text, imagePaths]
  );

  useEffect(() => {
    if (isAddedPost) {
      setText('');
    }
  }, [isAddedPost]);

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  const onChangeImages = useCallback((e) => {
    console.log(e.target.files);
    const imageFormData = new FormData();
    [].forEach.call(e.target.files, (f) => {
      imageFormData.append('image', f);
    });
    dispatch({
      type: UPLOAD_IMAGES_REQUEST,
      payload: imageFormData
    });
  }, []);

  const onRemoveImage = useCallback(
    (index) => () => {
      dispatch({
        type: REMOVE_IMAGE,
        index
      });
    },
    []
  );

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
        <input
          type="file"
          multiple
          hidden
          ref={imageInput}
          onChange={onChangeImages}
        />
        <Button onClick={onClickImageUpload}>Image upload</Button>
        <Button
          type="primary"
          style={{ float: 'right' }}
          htmlType="submit"
          loading={isAddingPost}
        >
          write
        </Button>
      </div>
      <div>
        {imagePaths.map((v, i) => (
          <div key={v} style={{ display: 'inline-block' }}>
            <img
              src={`http://localhost:8080/${v}`}
              style={{ width: '200px' }}
              alt={v}
            />
            <div>
              <Button onClick={onRemoveImage(i)}>제거</Button>
            </div>
          </div>
        ))}
      </div>
    </Form>
  );
};

export default PostForm;
