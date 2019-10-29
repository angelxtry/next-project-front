import React from 'react';

import { List, Comment, Avatar } from 'antd';

const CommentList = ({ post }) => {
  return (
    <List
      header={`${post.comments ? post.comments.length : 0} Comment`}
      itemLayout="horizontal"
      dataSource={post.comments || []}
      renderItem={(item) => (
        <li>
          <Comment
            author={item.User.nickname}
            avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
            content={item.content}
          />
        </li>
      )}
    />
  );
};

export default CommentList;
