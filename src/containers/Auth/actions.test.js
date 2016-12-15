import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import expect from 'expect';
import nock from 'nock';
import * as TYPES from './constants';
import * as ACTIONS from './actions';
import { JWT_TOKEN, ROOT_URL } from '../../utils';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);


describe('Auth actions', () => {
  const response400 = {
    status: 400,
    statusText: 'Bad Request',
  };

  describe('Auth sync actions', () => {
    beforeEach(() => {
      localStorage.removeItem(JWT_TOKEN);
    });

    afterEach(() => {
      nock.cleanAll();
    });

    it('loginUserSuccess should create LOGIN_USER_SUCCESS action', () => {
      expect(ACTIONS.loginUserSuccess('token')).toEqual({
        type: TYPES.LOGIN_USER_SUCCESS,
        payload: {
          token: 'token',
        },
      });
    });

    it('loginUserFailure should create LOGIN_USER_FAILURE action', () => {
      expect(ACTIONS.loginUserFailure({ response: response400 })).toEqual({
        type: TYPES.LOGIN_USER_FAILURE,
        payload: response400,
      });
    });

    it('loginUserRequest should create LOGIN_USER_REQUEST action', () => {
      expect(ACTIONS.loginUserRequest()).toEqual({ type: TYPES.LOGIN_USER_REQUEST });
    });

    it('logout should create LOGOUT_USER action', () => {
      expect(ACTIONS.logoutUser()).toEqual({ type: TYPES.LOGOUT_USER });
    });

    it('logoutAndRedirect should create LOGOUT_USER and PUSH_STATE actions', () => {
      const expectedActions = [
        {
          type: TYPES.LOGOUT_USER,
        }, {
          type: '@@router/CALL_HISTORY_METHOD',
          payload: {
            method: 'push',
            args: ['/login?redirect=/'],
          },
        },
      ];

      const store = mockStore({});

      store.dispatch(ACTIONS.logoutAndRedirect());
      const actions = store.getActions();
      expect(actions).toEqual(expectedActions);
    });
  });

  describe('Auth async actions', () => {
    it('loginUser should create LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, and PUSH_STATE actions when API returns 200', function() {
      this.timeout(2500);

      const expectedActions = [
        {
          type: TYPES.LOGIN_USER_REQUEST,
        }, {
          type: TYPES.LOGIN_USER_SUCCESS,
          payload: {
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IlRlc3QgVXNlciJ9.J6n4-v0I85zk9MkxBHroZ9ZPZEES-IKeul9ozxYnoZ8',
          },
        }, {
          type: '@@router/CALL_HISTORY_METHOD',
          payload: {
            method: 'push',
            args: ['/'],
          },
        },
      ];

      nock(ROOT_URL)
        .post('/rest-auth/login/', {
          email: 'join@us.com',
          password: 'password',
        })
        .reply(200, { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IlRlc3QgVXNlciJ9.J6n4-v0I85zk9MkxBHroZ9ZPZEES-IKeul9ozxYnoZ8' });

      const store = mockStore({});

      return store.dispatch(ACTIONS.loginUser('join@us.com', 'password', '/'))
        .then(() => {
          const actions = store.getActions();
          expect(actions).toEqual(expectedActions);
        });
    });

    it('loginUser should create LOGIN_USER_REQUEST and LOGIN_USER_FAILURE actions when API returns 400', function() {
      this.timeout(2500);

      const expectedActions = [
        {
          type: TYPES.LOGIN_USER_REQUEST,
        }, {
          type: TYPES.LOGIN_USER_FAILURE,
          payload: response400,
        },
      ];

      nock(ROOT_URL)
        .post('/rest-auth/login/')
        .reply((uri, body) => {
          let response = null;

          if (body.email === 'join@us.com' && body.password === 'pasword') {
            response = [200, { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IlRlc3QgVXNlciJ9.J6n4-v0I85zk9MkxBHroZ9ZPZEES-IKeul9ozxYnoZ8' }];
          } else {
            response = [400, { non_field_errors: ['Unable to log in with provided credentials.'] }];
          }

          return response;
        });


      const store = mockStore({});

      return store.dispatch(ACTIONS.loginUser('join@me.com', 'oldpassword', '/'))
        .then(() => {
          const actions = store.getActions();
          expect(actions).toEqual(expectedActions);
        });
    });
  });
});

