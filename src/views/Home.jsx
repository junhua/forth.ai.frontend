import React from 'react';

import SideBar from '../containers/SideBar/SideBar';

function Home() {
  return (
    <div>
      <div className="wrapper">
        <div className="sideBarWrapper"><SideBar /></div>
        <div className="content" />
      </div>
    </div>
  );
}

export default Home;
