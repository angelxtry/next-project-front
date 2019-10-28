import React from 'react';
import { Form, Input, Button } from 'antd';

const NicknameEditForm = () => {
  return (
    <Form
      style={{
        margin: '10px 0 20px',
        border: '1px solid #d9d9d9',
        padding: '20px'
      }}
    >
      <Input addonBefore="Nickname" />
      <Button type="primary" style={{ marginTop: '10px' }}>
        Modify
      </Button>
    </Form>
  );
};

export default NicknameEditForm;
