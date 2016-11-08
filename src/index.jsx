import 'babel-polyfill';
import React from 'react';
import ReactDom from 'react-dom';
import { browserHistory } from 'react-router';

import Root from './app/Root';
import configureStore from './store/configureStore';
// import { loginUserSuccess } from './containers/Account/actions';

const target = document.getElementById('root');
const { store, history } = configureStore(browserHistory, /*window.__INITIAL_STATE__*/);

const node = (
  <Root store={store} history={history} />
);

const token = localStorage.getItem('token');

if (token !== null) {
  // store.dispatch(loginUserSuccess(token))
}

ReactDom.render(node, target);

