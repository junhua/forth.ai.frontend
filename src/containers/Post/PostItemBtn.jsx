import React from 'react';

function PostItemBtn({ onToggle }) {
  return (
    <div className="mb-1_5em itemBtn">
      <div className="blank text-center">
        <a className="add-post" href="#add_post" onClick={onToggle}>
          <i className="fa fa-plus-square-o fa-3x" aria-hidden="true" /><span className="sr-only">add account</span>
        </a>
      </div>
    </div>
  );
}

PostItemBtn.propTypes = {
  onToggle: React.PropTypes.func.isRequired,
};

export default PostItemBtn;
