import { push } from 'react-router-redux';
import jwtDecode from 'jwt-decode';
import { LOGIN_USER_REQUEST, LOGIN_USER_FAILURE, LOGIN_USER_SUCCESS, LOGOUT_USER } from './constants';
import { fetchJSONWithTimeout, setJWTToStorage, removeJWTFromStorage, ROOT_URL } from '../../utils';
import { addNotification } from '../Toast/actions';

export function loginUserSuccess(token) {
  setJWTToStorage(token);
  return {
    type: LOGIN_USER_SUCCESS,
    payload: {
      token,
    },
  };
}

export function loginUserFailure(error) {
  removeJWTFromStorage();
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
  removeJWTFromStorage();
  return {
    type: LOGOUT_USER,
  };
}

export function logoutAndRedirect(redirect = '/login?redirect=/') {
  return (dispatch) => {
    dispatch(logoutUser());
    dispatch(push(redirect));
  };
}

export function loginUser(email, password, redirect = '/') {
  return (dispatch) => {
    dispatch(loginUserRequest());

    const config = {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    };

    return fetchJSONWithTimeout(`${ROOT_URL}/rest-auth/login/`, config, 2000)
      .then((response) => {
        try {
          jwtDecode(response.token);
          dispatch(loginUserSuccess(response.token));
          dispatch(addNotification('Welcome to Forth.ai.', 'succ', ''));
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
        dispatch(addNotification('Email Address or Password is not vaild.', 'error', 'close'));
      });
  };
}
