import jwtDecode from 'jwt-decode';
import { createReducer } from '../../utils';
import {
  LOGIN_USER_REQUEST, LOGIN_USER_FAILURE, LOGIN_USER_SUCCESS, LOGOUT_USER,
  REGISTER_USER_REQUEST, REGISTER_USER_FAILURE, REGISTER_USER_SUCCESS,
} from './constants';

const initialState = {
  token: null,
  userName: null,
  isAuthenticated: false,
  isAuthenticating: false,
  statusText: null,
};

export default createReducer(initialState, {
  [LOGIN_USER_REQUEST]: state => (
    Object.assign({}, state, {
      isAuthenticating: true,
      statusText: null,
    })
  ),
  [LOGIN_USER_SUCCESS]: (state, payload) => (
    Object.assign({}, state, {
      isAuthenticating: false,
      isAuthenticated: true,
      token: payload.token,
      userName: jwtDecode(payload.token).username,
      statusText: 'You have been successfully logged in.',
    })
  ),
  [LOGIN_USER_FAILURE]: (state, payload) => (
    Object.assign({}, state, {
      isAuthenticating: false,
      isAuthenticated: false,
      token: null,
      userName: null,
      statusText: `Authentication Error: ${payload.status} ${payload.statusText}`,
    })
  ),
  [LOGOUT_USER]: state => (
    Object.assign({}, state, {
      isAuthenticated: false,
      token: null,
      userName: null,
      statusText: 'You have been successfully logged out.',
    })
  ),

  [REGISTER_USER_REQUEST]: state => (
    Object.assign({}, state, {
      isAuthenticating: true,
      statusText: null,
    })
  ),
  [REGISTER_USER_FAILURE]: state => (
    Object.assign({}, state, {
      isAuthenticating: false,
      statusText: 'Registration hava been failed.',
    })
  ),
  [REGISTER_USER_SUCCESS]: state => (
    Object.assign({}, state, {
      isAuthenticating: false,
      statusText: 'You have been successfully registered.',
    })
  ),
});
