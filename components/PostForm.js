import React from 'react';
import { Form, Input, Button } from 'antd';

const PostForm = () => {
  return (
    <Form encType="multipart/form-data" style={{ margin: '10px 0 20px' }}>
      <Input.TextArea maxLength={140} placeholder="기분을 적어주세요." />
      <div>
        <Input type="file" multiple hidden />
        <Button>Image Upload</Button>
        <Button type="primary" style={{ float: 'right' }} htmlType="submit">
          write
        </Button>
      </div>
    </Form>
  );
};

export default PostForm;
