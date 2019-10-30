import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { LOAD_MAIN_POSTS_REQUEST } from '../reducers/post';

const Home = () => {
  const { isLoggedIn } = useSelector((state) => state.user);
  const { mainPosts } = useSelector((state) => state.post);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: LOAD_MAIN_POSTS_REQUEST
    });
  }, []);

  return (
    <div>
      {isLoggedIn && <PostForm />}
      {mainPosts.map((post, i) => {
        return <PostCard key={i} post={post} />;
      })}
    </div>
  );
};

export default Home;
