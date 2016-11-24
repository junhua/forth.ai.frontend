import 'babel-polyfill';
import React from 'react';
import ReactDom from 'react-dom';
import { browserHistory } from 'react-router';
import { push } from 'react-router-redux';

import Root from './app/Root';
import configureStore from './store/configureStore';
import { loginUserSuccess } from './containers/Account/actions';
import { checkTokenExpiry, getJWTFromStorage } from './utils';

const target = document.getElementById('root');
const { store, history } = configureStore(browserHistory, /*window.__INITIAL_STATE__*/);

const node = (
  <Root store={store} history={history} />
);

const token = getJWTFromStorage();

if (checkTokenExpiry()) {
  store.dispatch(loginUserSuccess(token));
  store.dispatch(push('/'));
}

ReactDom.render(node, target);

