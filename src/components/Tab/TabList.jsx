import React, { PropTypes } from 'react';

function TabList({ children }) {
  return (
    <ul className="nav nav-tabs nav-justified tab-list">
      { children }
    </ul>
  );
}

TabList.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TabList;
