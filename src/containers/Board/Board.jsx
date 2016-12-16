import React, { Component } from 'react';
import PostBoard from '../Post/PostBoard';
import './Board.scss';

class Board extends Component {
  constructor(props) {
    super(props);

    this.handleSelected = this.handleSelected.bind(this);
    this.renderTabList = this.renderTabList.bind(this);
    this.renderTabPanels = this.renderTabPanels.bind(this);
  }
  state = {
    selected: 0,
    tabs: [
      <a>Queue <i className="fa fa-calendar" aria-hidden="true" /></a>,
      <a>Analytics <i className="fa fa-bar-chart" aria-hidden="true" /></a>,
      <a>Plan <i className="fa fa-lightbulb-o" aria-hidden="true" /></a>,
      <a>Settings <i className="fa fa-cog" aria-hidden="true" /></a>,
    ],
    tabPanels: [
      <PostBoard />,
      'Analytics',
      'Plan',
      'Settings',
    ],
  };

  setSelected(selected) {
    if (selected < 0) return;
    if (selected === this.state.selected) return;
    this.setState({ selected });
  }

  handleSelected(selected) {
    return () => this.setSelected(selected);
  }

  renderTabList() {
    const { selected, tabs } = this.state;
    return tabs.map((tab, index) => {
      const className = (selected === index) ? 'nav-tab tab active' : 'nav-tab tab';
      return (<li className={className} key={index} onClick={this.handleSelected(index)}>{tab}</li>);
    });
  }

  renderTabPanels() {
    const { selected, tabPanels } = this.state;
    /* return tabPanels.map((tabPanel, index) => {
      const className = (index === selected) ? 'tab-panel tab-panel-active' : 'tab-panel';
      return (<div className={className} key={index}>{tabPanel}</div>);
    });*/

    return (
      <div className="tab-panel tab-panel-active">
        { tabPanels[selected] }
      </div>);
  }

  render() {
    return (
      <div className="container-fuild board-container">
        <div className="tabs">
          <ul className="nav nav-tabs nav-justified tab-list">
            {this.renderTabList()}
          </ul>
          {this.renderTabPanels()}
        </div>
      </div>
    );
  }
}

export default Board;
