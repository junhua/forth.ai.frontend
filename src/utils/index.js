import fetch from 'isomorphic-fetch';
import { UserAuthWrapper } from 'redux-auth-wrapper';
import { push } from 'react-router-redux';
import jwtDecode from 'jwt-decode';

export const JWT_TOKEN = '_jwt_token';
export const ROOT_URL = `http://${process.env.API_ADDRESS}`;

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

  const error = {};
  error.response = response;
  return Promise.reject(error);
  // const error = new Error(response.statusText);
  // error.response = response;
  // throw error;
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

export function getJWTFromStorage() {
  return localStorage.getItem(JWT_TOKEN);
}

export function setJWTToStorage(jwt) {
  return localStorage.setItem(JWT_TOKEN, jwt);
}

export function removeJWTFromStorage() {
  return localStorage.removeItem(JWT_TOKEN);
}

export function checkTokenExpiry() {
  const jwt = getJWTFromStorage();
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

export function validateEmail(str) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(str);
}

export function toArray(els) {
  return Array.prototype.slice.call(els);
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export function fetchJSON(url, options, ms) {
  options.headers = Object.assign({
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }, options.headers);

  if (options.body && typeof options.body !== 'string') {
    options.body = JSON.stringify(options.body);
  }

  let promise = null;
  if (ms) {
    promise = sleep(ms).then(() => fetch(url, options));
  } else {
    promise = fetch(url, options);
  }

  return promise
    .then(checkHttpStatus)
    .then(parseJSON);
}

export function createCookie(name, value, days) {
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = `; expires=${date.toGMTString()}`;
  } else {
    expires = '';
  }
  document.cookie = `${name}=${value}${expires}; path=/`;
}

export function readCookie(name) {
  const nameEQ = `${name}=`;
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i += 1) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

export function eraseCookie(name) {
  createCookie(name, '', -1);
}

export function stopPropagation(event) {
  event.stopPropagation();
  event.nativeEvent.stopImmediatePropagation();
}

if (!Array.isArray) {
  Array.isArray = arg => Object.prototype.toString.call(arg) === '[object Array]';
}

// http://stackoverflow.com/questions/1500260/detect-urls-in-text-with-javascript
export function urlify(text) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(urlRegex, url => (`<a href="${url}">${url}</a>`));
  // or alternatively
  // return text.replace(urlRegex, '<a href="$1">$1</a>')
}

// http://stackoverflow.com/questions/37684/how-to-replace-plain-urls-with-links
export function linkify(text) {
  // http://, https://, ftp://
  const urlPattern = /\b(?:https?|ftp):\/\/[a-z0-9-+&@#\/%?=~_|!:,.;]*[a-z0-9-+&@#\/%=~_|]/gim;

  // www. sans http:// or https://
  const pseudoUrlPattern = /(^|[^\/])(www\.[\S]+(\b|$))/gim;

  // Email addresses *** here I've changed the expression ***
  const emailAddressPattern = /(([a-zA-Z0-9_\-\.]+)@[a-zA-Z_]+?(?:\.[a-zA-Z]{2,6}))+/gim;

  return text
      .replace(urlPattern, '<a title="link" href="$&" target="_blank"><i class="fa fa-link" aria-hidden="true"></i>$&</a>')
      .replace(pseudoUrlPattern, '$1<a title="link" href="http://$2" target="_blank"><i class="fa fa-link" aria-hidden="true"></i>$2</a>')
      .replace(emailAddressPattern, '<a title="link" href="mailto:$1" target="_blank"><i class="fa fa-link" aria-hidden="true"></i>$1</a>');
}
