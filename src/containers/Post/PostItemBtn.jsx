import React from 'react';

function PostItemBtn({ onToggle }) {
  return (
    <div className="post-item-add-wrapper">
      <div className="blank text-center">
        <a className="post-add-btn" href="#add_post" onClick={onToggle}>
          <i className="fa fa-plus-square-o fa-3x" aria-hidden="true" />
          <span className="sr-only">add account</span>
        </a>
      </div>
    </div>
  );
}

PostItemBtn.propTypes = {
  onToggle: React.PropTypes.func.isRequired,
};

export default PostItemBtn;
