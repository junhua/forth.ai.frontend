import { push } from 'react-router-redux';
import fetch from 'isomorphic-fetch';
import jwtDecode from 'jwt-decode';
import { LOGIN_USER_REQUEST, LOGIN_USER_FAILURE, LOGIN_USER_SUCCESS, LOGOUT_USER, JWT_TOKEN } from './constants';
import { checkHttpStatus, parseJSON, delay, ROOT_URL } from '../../utils';

export function loginUserSuccess(token) {
  localStorage.setItem(JWT_TOKEN, token);
  return {
    type: LOGIN_USER_SUCCESS,
    payload: {
      token,
    },
  };
}

export function loginUserFailure(error) {
  localStorage.removeItem(JWT_TOKEN);
  return {
    type: LOGIN_USER_FAILURE,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText,
    },
  };
}

export function loginUserRequest() {
  return {
    type: LOGIN_USER_REQUEST,
  };
}

export function logoutUser() {
  localStorage.removeItem(JWT_TOKEN);
  return {
    type: LOGOUT_USER,
  };
}

export function logoutAndRedirect() {
  return (dispatch) => {
    dispatch(logoutUser());
    dispatch(push('/login'));
  };
}

export function loginUser(email, password, redirect = '/') {
  return (dispatch) => {
    dispatch(loginUserRequest());
    return fetch(`${ROOT_URL}/rest-auth/login/`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
    .then(delay(2000))
    .then(checkHttpStatus)
    .then(parseJSON)
    .then((response) => {
      try {
        jwtDecode(response.token);
        dispatch(loginUserSuccess(response.token));
        dispatch(push(redirect));
      } catch (e) {
        dispatch(loginUserFailure({
          response: {
            status: 403,
            statusText: 'Invalid token',
          },
        }));
      }
    })
    .catch((error) => {
      dispatch(loginUserFailure(error));
    });
  };
}
