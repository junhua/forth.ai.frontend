import React from 'react';
import PostBoard from '../Post/PostBoard';
import { toArray } from '../../utils';
import './Board.scss';

// import { Tabs, TabList, Tab, TabPanel } from '../../components';

function toggle(elms, selected, className) {
  elms.map((elm, index) => {
    elm.classList.remove(className);
    if (selected === index) {
      elm.classList.add(className);
    }
    return elm;
  });
}

function toggleTab(selected) {
  return () => {
    const tabs = toArray(document.querySelectorAll('.board-container .js-tab'));
    const tabPanels = toArray(document.querySelectorAll('.board-container .js-tab-panel'));

    toggle(tabs, selected, 'active');
    toggle(tabPanels, selected, 'tab-panel-active');
  };
}

function Board() {
  return (
    <div className="container-fuild board-container">
      <div className="tabs">
        <ul className="nav nav-tabs nav-justified tab-list">
          <li className="nav-tab tab active js-tab" onClick={toggleTab(0)}>
            <a>Queue <i className="fa fa-calendar" aria-hidden="true" /></a>
          </li>
          <li className="nav-tab tab js-tab" onClick={toggleTab(1)}>
            <a>Analytics <i className="fa fa-bar-chart" aria-hidden="true" /></a>
          </li>
          <li className="nav-tab tab js-tab" onClick={toggleTab(2)}>
            <a>Plan <i className="fa fa-lightbulb-o" aria-hidden="true" /></a>
          </li>
          <li className="nav-tab tab js-tab" onClick={toggleTab(3)}>
            <a>Settings <i className="fa fa-cog" aria-hidden="true" /></a>
          </li>
        </ul>
        <div className="tab-panel tab-panel-active js-tab-panel"><PostBoard /></div>
        <div className="tab-panel js-tab-panel">analytics</div>
        <div className="tab-panel js-tab-panel">plan</div>
        <div className="tab-panel js-tab-panel">setting</div>
      </div>


      {/* <Tabs selected={0}>
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
      </Tabs>*/}
    </div>
  );
}

export default Board;
