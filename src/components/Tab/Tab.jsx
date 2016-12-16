import React, { PropTypes } from 'react';

function Tab({ children, isActive, onClick }) {
  return (
    <li
      className={`nav-tab tab ${isActive ? 'active' : ''}`}
      onClick={onClick}
    >
      { children }
    </li>
  );
}

Tab.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
  ]).isRequired,
  isActive: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Tab;
