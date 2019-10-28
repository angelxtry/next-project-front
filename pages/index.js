import React from 'react';
import { useSelector} from 'react-redux';

import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';

const Home = () => {
  const { isLoggedIn } = useSelector(state => state.user)
  const { mainPosts } = useSelector(state => state.post)
  return (
    <div>
      {isLoggedIn && <PostForm />}
      {mainPosts.map((post) => {
        return <PostCard key={post.postId} post={post} />;
      })}
    </div>
  );
};

export default Home;
