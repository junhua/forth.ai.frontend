import expect from 'expect';
import authReducer from './authReducer';
import * as ACTIONS from './actions';
import jwtDecode from 'jwt-decode';

describe('Account reducers', () => {
  const initialState = {
    token: null,
    userName: null,
    isAuthenticated: false,
    isAuthenticating: false,
    statusText: null,
  };

  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImV4YW1wbGUiLCJ1c2VyX2lkIjoyMjMsImVtYWlsIjoiZXhhbXBsZUBwcm9xb2QuY29tIiwiZXhwIjoxNDc5MjgwMDI0fQ.i5soQH9_d2EaWNia1D27wgJHP_g0cLCiQ0uCLFPHStA';

  let loggedState = null;

  it('should return initial state', () => {
    expect(authReducer(undefined, {}))
      .toEqual(initialState);
  });

  it('should handle LOGIN_USER_REQUEST', () => {
    expect(authReducer(initialState, ACTIONS.loginUserRequest())).toEqual({
      token: null,
      userName: null,
      isAuthenticated: false,
      isAuthenticating: true,
      statusText: null,
    });
  });

  it('should handle LOGIN_USER_SUCCESS', () => {
    loggedState = authReducer(initialState, ACTIONS.loginUserSuccess(token));

    expect(loggedState).toEqual({
      token,
      userName: jwtDecode(token).username,
      isAuthenticated: true,
      isAuthenticating: false,
      statusText: 'You have been successfully logged in.',
    });
  });

  it('should handle LOGIN_USER_FAILURE', () => {
    const payload = {
      status: 400,
      statusText: 'Bad Request',
    };

    expect(authReducer(initialState, ACTIONS.loginUserFailure({
      response: {
        status: payload.status,
        statusText: payload.statusText,
      },
    }))).toEqual({
      token: null,
      userName: null,
      isAuthenticated: false,
      isAuthenticating: false,
      statusText: `Authentication Error: ${payload.status} ${payload.statusText}`,
    });
  });

  it('should handle LOGOUT_USER', () => {
    expect(authReducer(loggedState, ACTIONS.logoutUser())).toEqual({
      token: null,
      userName: null,
      isAuthenticated: false,
      isAuthenticating: false,
      statusText: 'You have been successfully logged out.',
    });
  });
});
