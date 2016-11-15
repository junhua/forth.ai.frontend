import 'babel-polyfill';
import React from 'react';
import ReactDom from 'react-dom';
import { browserHistory } from 'react-router';
import { push } from 'react-router-redux';

import Root from './app/Root';
import configureStore from './store/configureStore';
import { loginUserSuccess } from './containers/Account/actions';
import { JWT_TOKEN } from './containers/Account/constants';
import { checkTokenExpiry } from './utils';

const target = document.getElementById('root');
const { store, history } = configureStore(browserHistory, /*window.__INITIAL_STATE__*/);

const node = (
  <Root store={store} history={history} />
);

const token = localStorage.getItem(JWT_TOKEN);


console.log(JWT_TOKEN, token);
console.log(checkTokenExpiry());
if (checkTokenExpiry()) {
  store.dispatch(loginUserSuccess(token));
  store.dispatch(push('/'));
}

ReactDom.render(node, target);

