import React from 'react';
import PostItem from './PostItem';
import PostItemNew from './PostItemNew';
import PostItemBtn from './PostItemBtn';
import './Post.scss';

function PostBoard() {
  return (
    <div className="clearfix posts">
      <PostItem />
      <PostItem />
      <PostItemNew />
      <PostItemBtn />
    </div>
  );
}

export default PostBoard;
