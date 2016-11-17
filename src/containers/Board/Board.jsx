import React from 'react';
import PostItem from './PostItem';
import { toArray } from '../../utils';
import './Board.scss';

function PostItemNew() {
  return (
    <div className="mb-1_5em itemNew">
      <form className="post-form">
        <input type="url" className="form-control mb-1_5em" placeholder="URL" />
        <textarea className="form-control mb-1_5em" rows="3" placeholder="TEXT" />
        <div className="row">
          <div className="col-md-8">
            <div className="form-group">
              <label htmlFor="uploadPhoto" className="btn btn-default fw-bolder btn-file">UPLOAD PHOTO</label>
              <input type="file" id="uploadPhoto" className="sr-only" />
            </div>
          </div>
          <div className="col-md-4">
            <button type="submit" className="btn btn-default pull-right btn-post fw-bolder">POST</button>
          </div>
        </div>

      </form>
    </div>
  );
}


function PostItemBtn() {
  return (
    <div className="mb-1_5em itemBtn">
      <div className="blank text-center">
        <a className="add-post" href="#add_post">
          <i className="fa fa-plus-square-o fa-3x" aria-hidden="true" /><span className="sr-only">add account</span>
        </a>
      </div>
    </div>
  );
}

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

    console.log(e.target, selectedIndex);
    const tabs = toArray(document.querySelectorAll('.board-container .nav-tab'));
    const items = toArray(document.querySelectorAll('.board-container .nav-item'));
    console.warn(tabs, items);

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
        <li className="loading text-center">
          <i className="fa fa-spinner fa-pulse fa-3x fa-fw" />
          <span className="sr-only">Loading...</span>
        </li>
        <li className="nav-item active queue">
          <div className="clearfix posts">
            <PostItem />
            <PostItem />
            <PostItemNew />
            <PostItemBtn />
          </div>
        </li>
        <li className="nav-item analytics">
          <div className="clearfix posts">
            <PostItem />
            <PostItem />
            <PostItemNew />
          </div>
        </li>
        <li className="nav-item plan">
          <div className="clearfix posts">
            <PostItem />
            <PostItem />
            <PostItemBtn />
          </div>
        </li>
        <li className="nav-item settings">
          <div className="clearfix posts">
            <PostItem />
            <PostItemNew />
            <PostItemBtn />
          </div>
        </li>

        {/* <div id="analytics"></div>
        <div id="plan"></div>
        <div id="settings"></div>*/}
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
