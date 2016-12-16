import { push } from 'react-router-redux';
import jwtDecode from 'jwt-decode';
import {
  LOGIN_USER_REQUEST, LOGIN_USER_FAILURE, LOGIN_USER_SUCCESS, LOGOUT_USER,
  REGISTER_USER_REQUEST, REGISTER_USER_FAILURE, REGISTER_USER_SUCCESS, /* EMAIL_EXIST,  USERNAME_EXIST,*/
} from './constants';
import { fetchJSON, setJWTToStorage, removeJWTFromStorage, ROOT_URL } from '../../utils';
import { addNotification, clearNotification } from '../Toast/actions';

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

export function loginUserRequest() { return { type: LOGIN_USER_REQUEST }; }

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

    return fetchJSON(`${ROOT_URL}/rest-auth/login/`, config, 750)
      .then((response) => {
        try {
          jwtDecode(response.token);
          dispatch(loginUserSuccess(response.token));
          dispatch(addNotification('Welcome to Forth.ai', 'succ', ''));
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
        dispatch(addNotification('Invalid password or username!', 'error', 'close'));
      });
  };
}


export function reigsterUserRequest() { return { type: REGISTER_USER_REQUEST }; }
export function reigsterUserFailure(error) {
  return {
    type: REGISTER_USER_FAILURE,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText,
    },
  };
}
export function reigsterUserSuccess() { return { type: REGISTER_USER_SUCCESS }; }

export function registerUser(fields) {
  return (dispatch) => {
    dispatch(reigsterUserRequest());

    const config = {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(fields),
    };

    return fetchJSON(`${ROOT_URL}/rest-auth/registration/`, config)
      .then(() => {
        dispatch(reigsterUserSuccess());
        dispatch(clearNotification());
        dispatch(addNotification('You have successfully registered! You\'ll need to confirm your email-address before logging in', 'succ', 'close'));
        dispatch(push('/login'));
      })
      .catch((error) => {
        dispatch(reigsterUserFailure(error));

        if (error.response.status !== 400) {
          return Promise.reject(error);
        }

        return error.response.json();
      })
      .then((badResponse) => {
        if (badResponse && Array.isArray(badResponse.email)
          && badResponse.email.includes('A user is already registered with this e-mail address.')) {
          dispatch(addNotification('The email Address already exists!', 'error', 'close'));
        }
      })
      .catch(() => {
        dispatch(addNotification('The server is currently undergoing maintainence. Try again later!', 'error', 'close'));
      });
  };
}

export function emailExist(email) {
  return (dispatch) => {
    const config = {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({ email }),
    };

    return fetchJSON(`${ROOT_URL}/rest-auth/registration/`, config)
      .catch((error) => {
        if (error.response.status !== 400) {
          dispatch(addNotification('The server is currently undergoing maintainence. Try again later!', 'error', 'close'));
          return Promise.reject(error);
        }

        return error.response.json();
      });
  };
}