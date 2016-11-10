import React from 'react';

import SideBar from '../containers/SideBar/SideBar';
import Board from '../containers/Board/Board';

function Home() {
  return (
    <div className="wrapper">
      <div className="sideBarWrapper">
        <SideBar />
      </div>
      <div className="boardtWrapper">
        <Board />
      </div>
    </div>
  );
}

export default Home;
