import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PostCard from '../components/PostCard';
import { LOAD_HASHTAG_POSTS_REQUEST } from '../reducers/post';

const hashtag = ({ tag }) => {
  const { mainPosts } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: LOAD_HASHTAG_POSTS_REQUEST,
      payload: { tag }
    });
  }, [tag]);
  return (
    <div>
      {mainPosts.map((c, i) => (
        <PostCard key={i} post={c} />
      ))}
    </div>
  );
};

hashtag.getInitialProps = async (context) => {
  return { tag: context.query.tag };
};

export default hashtag;
