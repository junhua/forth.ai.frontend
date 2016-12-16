import React, { PropTypes } from 'react';

function TabPanel({ children, isActive }) {
  return (
    <div className={`tab-panel ${isActive ? 'tab-panel-active' : ''}`}>
      {children}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]).isRequired,
  isActive: PropTypes.bool,
};

export default TabPanel;
