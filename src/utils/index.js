import fetch from 'isomorphic-fetch';
import { UserAuthWrapper } from 'redux-auth-wrapper';
import { push } from 'react-router-redux';
import jwtDecode from 'jwt-decode';
import { JWT_TOKEN } from '../containers/Account/constants';

export function createReducer(initialState, reducerMap) {
  return (state = initialState, action) => {
    const reducer = reducerMap[action.type];

    return reducer
      ? reducer(state, action.payload)
      : state;
  };
}

export function checkHttpStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

export function parseJSON(response) {
  return response.json();
}

export const requireAuthentication = UserAuthWrapper({
  authSelector: state => state.auth,
  predicate: auth => auth.isAuthenticated,
  redirectAction: push,
  wrapperDisplayName: 'UserIsJWTAuthenticated',
});

export function checkTokenExpiry() {
  const jwt = localStorage.getItem(JWT_TOKEN);
  if (jwt) {
    const jwtExp = jwtDecode(jwt).exp;
    const expiryDate = new Date(0);
    expiryDate.setUTCSeconds(jwtExp);

    if (new Date() < expiryDate) {
      return true;
    }
  }
  return false;
}

export function delay(wait) {
  return response => new Promise((resolve) => {
    setTimeout(() => {
      resolve(response);
    }, wait);
  });
}

export function validEmail(str) {
  return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(str);
}

export function toArray(els) {
  return Array.prototype.slice.call(els);
}

export function fetchJSON(url, options) {
  options.headers = Object.assign({
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }, options.headers);

  if (options.body && typeof options.body !== 'string') {
    options.body = JSON.stringify(options.body);
  }

  return fetch(url, options)
    .then(checkHttpStatus)
    .then(parseJSON);
}
