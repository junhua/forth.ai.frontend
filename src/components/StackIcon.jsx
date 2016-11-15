import React from 'react';
import './Stack.scss';

function StackIcon() {
  return (
    <div className="stack">
      <span className="circle-thin">forth.ai</span>
      <span className="fa-stack subscript">
        <i className="fa fa-circle fa-stack-2x facebook-cirlce-color" />
        <i className="fa fa-facebook fa-stack-1x facebook-color" />
      </span>
    </div>
  );
}

export default StackIcon;
