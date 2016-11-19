import React from 'react';
import { toArray } from '../../utils';
import PostBoard from '../Post/PostBoard';
import './Board.scss';

function toggle(els, selectedIndex) {
  els.map((el, index) => {
    el.classList.remove('active');
    if (selectedIndex === index) {
      el.classList.add('active');
    }
    return el;
  });
}

function toggleTab(selectedIndex) {
  return (e) => {
    e.stopPropagation();

    const tabs = toArray(document.querySelectorAll('.board-container .nav-tab'));
    const items = toArray(document.querySelectorAll('.board-container .nav-item'));

    toggle(tabs, selectedIndex);
    toggle(items, selectedIndex);
  };
}

function Board() {
  return (
    <div className="container-fuild board-container">
      <ul className="nav nav-tabs nav-justified">
        <li role="presentation" className="nav-tab active">
          <a href="#queue" onClick={toggleTab(0)}>Queue <i className="fa fa-calendar" aria-hidden="true" /></a>
        </li>
        <li role="presentation" className="nav-tab">
          <a href="#analytics" onClick={toggleTab(1)}>Analytics <i className="fa fa-bar-chart" aria-hidden="true" /></a>
        </li>
        <li role="presentation" className="nav-tab">
          <a href="#plan" onClick={toggleTab(2)}>Plan <i className="fa fa-lightbulb-o" aria-hidden="true" /></a>
        </li>
        <li role="presentation" className="nav-tab">
          <a href="#settings" onClick={toggleTab(3)}>Settings <i className="fa fa-cog" aria-hidden="true" /></a>
        </li>
      </ul>

      <ul className="nav navBody">
        <li className="nav-item active queue">
          <PostBoard />
        </li>
        <li className="nav-item analytics">
          PostBoard
        </li>
        <li className="nav-item plan">
          PostBoard
        </li>
        <li className="nav-item settings">
          PostBoard
        </li>
      </ul>

      {/* <i className="fa fa-check-circle-o" aria-hidden="true" />
      <i className="fa fa-minus-circle" aria-hidden="true" />
      <i className="fa fa-tasks" aria-hidden="true" />
      <i className="fa fa-gear" aria-hidden="true" />
      <i className="fa fa-arrows" aria-hidden="true" />
      <i className="fa fa-edit" aria-hidden="true" />
      <i className="fa fa-times-circle-o" aria-hidden="true" />
      <i className="fa fa-pencil" aria-hidden="true" />
      <i className="fa fa-plus-circle" aria-hidden="true" />
      <i className="fa fa-bar-chart" aria-hidden="true" />
      <i className="fa fa-google-plus" aria-hidden="true" />
      <i className="fa fa-facebook" aria-hidden="true" />
      <i className="fa fa-twitter" aria-hidden="true" />
      <i className="fa fa-plus-square-o" aria-hidden="true" />
      <i className="fa fa-plus-circle-o" aria-hidden="true" />

      <span className="fa-stack fa-lg">
        <i className="fa fa-square-o fa-stack-2x" />
        <i className="fa fa-twitter fa-stack-1x" />
      </span>*/}

    </div>
  );
}

export default Board;
