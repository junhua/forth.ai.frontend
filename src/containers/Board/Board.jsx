import React from 'react';
import PostBoard from '../Post/PostBoard';
import './Board.scss';

import { Tabs, TabList, Tab, TabPanel } from '../../components';

function Board() {
  return (
    <div className="container-fuild board-container">
      <Tabs selected={0}>
        <TabList>
          <Tab>
            <a>Queue <i className="fa fa-calendar" aria-hidden="true" /></a>
          </Tab>
          <Tab>
            <a>Analytics <i className="fa fa-bar-chart" aria-hidden="true" /></a>
          </Tab>
          <Tab>
            <a>Plan <i className="fa fa-lightbulb-o" aria-hidden="true" /></a>
          </Tab>
          <Tab>
            <a>Settings <i className="fa fa-cog" aria-hidden="true" /></a>
          </Tab>
        </TabList>

        <TabPanel>
          <PostBoard />
        </TabPanel>

        <TabPanel>
          analytics
        </TabPanel>

        <TabPanel>
          plan
        </TabPanel>

        <TabPanel>
          setting
        </TabPanel>
      </Tabs>
    </div>
  );
}

export default Board;
