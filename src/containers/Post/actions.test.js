import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import expect from 'expect';
import nock from 'nock';
import * as TYPES from './constants';
import * as ACTIONS from './actions';
import { ROOT_URL } from '../../utils';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

if (!Array.isArray) {
  Array.isArray = arg => Object.prototype.toString.call(arg) === '[object Array]';
}

describe('Post actions', () => {
  const response400 = {
    status: 400,
    statusText: 'Bad Request',
  };

  const response401 = {
    status: 401,
    statusText: 'Unauthorized',
  };

  afterEach(() => {
    nock.cleanAll();
  });

  it('fetchPostsRequest should create FETCH_POSTS_REQUEST action', () => {
    expect(ACTIONS.fetchPostsRequest()).toEqual({ type: TYPES.FETCH_POSTS_REQUEST });
  });

  it('fetchPostsFauilure should create FETCH_POSTS_FAILURE action', () => {
    expect(ACTIONS.fetchPostsFailure({ response: response401 })).toEqual({
      type: TYPES.FETCH_POSTS_FAILURE,
      payload: response401,
    });
  });

  it('fetchPostsSuccess should create FETCH_POSTS_SUCCESS action', () => {
    const posts = [];
    expect(ACTIONS.fetchPostsSuccess(posts)).toEqual({
      type: TYPES.FETCH_POSTS_SUCCESS,
      payload: { posts },
    });
  });

  it('fetchPosts should create FETCH_POSTS_REQUEST, FETCH_POSTS_FAILURE actions when API returns 401', function() {
    this.timeout(1500);

    const expectActions = [
      {
        type: TYPES.FETCH_POSTS_REQUEST,
      }, {
        type: TYPES.FETCH_POSTS_FAILURE,
        payload: response401,
      },
    ];

    nock(ROOT_URL)
    .get('/v1/posts/')
    .reply(function() {
      let response = null;

      if (this.req.headers.authorization[0] === 'JWT token') {
        response = [200, []];
      } else {
        response = [401, { detail: 'Authentication credentials were not provided.' }];
      }

      return response;
    });

    const store = mockStore({});

    return store.dispatch(ACTIONS.fetchPosts('bad token'))
      .then(() => {
        const actions = store.getActions();
        expect(actions).toEqual(expectActions);
      });
  });

  it('fetchPosts should create FETCH_POSTS_REQUEST, FETCH_POSTS_SUCCESS actions when API returns 200', function() {
    this.timeout(1500);

    const posts = [];
    const expectActions = [
      {
        type: TYPES.FETCH_POSTS_REQUEST,
      }, {
        type: TYPES.FETCH_POSTS_SUCCESS,
        payload: { posts },
      },
    ];

    nock(ROOT_URL)
    .matchHeader('authorization', val => Array.isArray(val) && val[0] === 'JWT token')
    .get('/v1/posts/')
    .reply(200, posts);

    const store = mockStore({});

    return store.dispatch(ACTIONS.fetchPosts('token'))
      .then(() => {
        const actions = store.getActions();
        expect(actions).toEqual(expectActions);
      });
  });

  it('updatePostRequest should create UPDATE_POST_REQUEST action', () => {
    expect(ACTIONS.updatePostRequest()).toEqual({ type: TYPES.UPDATE_POST_REQUEST });
  });

  it('updatePostFailure should create UPDATE_POST_FAILURE action', () => {
    expect(ACTIONS.updatePostFailure({ response: response400 })).toEqual({
      type: TYPES.UPDATE_POST_FAILURE,
      payload: response400,
    });
  });

  it('updatePostSuccess should create UPDATE_POST_SUCCESS action', () => {
    const post = { data: '' };
    expect(ACTIONS.updatePostSuccess(post)).toEqual({
      type: TYPES.UPDATE_POST_SUCCESS,
      payload: { post },
    });
  });

  it('updatePost should create UPDATE_POST_REQUEST, UPDATE_POST_FAILURE actions when API return 400', () => {
    const expectActions = [
      {
        type: TYPES.UPDATE_POST_REQUEST,
      }, {
        type: TYPES.UPDATE_POST_FAILURE,
        payload: response400,
      },
    ];

    nock(ROOT_URL)
    .put('/v1/posts/400/')
    .reply(function(uri, body) {
      let response = null;

      if (this.req.headers.authorization[0] !== 'JWT token') {
        response = [401, { detail: 'Authentication credentials were not provided.' }];
      } else if (
          Array.isArray(body.themes) &&
          Array.isArray(body.keywords) &&
          typeof body.content === 'string' &&
          parseInt(body.type, 10) >= 0 && parseInt(body.type, 10) <= 2
        ) {
        response = [200, Object.assign({}, body, { date_created: new Date().toJOSN() })];
      } else {
        response = [400, {}];
      }

      return response;
    });

    const store = mockStore({});

    return store.dispatch(ACTIONS.updatePost({ id: 400, data: '' }, 'token'))
      .then(() => {
        const actions = store.getActions();
        expect(actions).toEqual(expectActions);
      });
  });

  it('updatePost should create UPDATE_POST_REQUEST, UPDATE_POST_SUCCESS actions when API return 200', () => {
    const post = {
      id: 200,
      type: 2,
      themes: ['one', 'two'],
      keywords: ['three', 'four'],
      content: 'content',
    };

    const expectActions = [
      {
        type: TYPES.UPDATE_POST_REQUEST,
      }, {
        type: TYPES.UPDATE_POST_SUCCESS,
        payload: { post },
      },
    ];

    nock(ROOT_URL)
      .matchHeader('Authorization', val => Array.isArray(val) && val[0] === 'JWT token')
      .put('/v1/posts/200/', body => (
        Array.isArray(body.themes) &&
        Array.isArray(body.keywords) &&
        typeof body.content === 'string' &&
        parseInt(body.type, 10) >= 0 && parseInt(body.type, 10) <= 2)
      )
      .reply(200, post);

    const store = mockStore({});

    return store.dispatch(ACTIONS.updatePost(post, 'token'))
      .then(() => {
        const actions = store.getActions();
        expect(actions).toEqual(expectActions);
      });
  });

  it('createPostRequest should create CREATE_POST_REQUEST action', () => {
    expect(ACTIONS.createPostRequest()).toEqual({ type: TYPES.CREATE_POST_REQUEST });
  });

  it('createPostFailure should create CREATE_POST_FAILURE action', () => {
    expect(ACTIONS.createPostFailure({ response: response400 })).toEqual({
      type: TYPES.CREATE_POST_FAILURE,
      payload: response400,
    });
  });

  it('createPostSuccess should create CREATE_POST_SUCCESS action', () => {
    expect(ACTIONS.createPostSuccess('data')).toEqual({
      type: TYPES.CREATE_POST_SUCCESS,
      payload: { post: 'data' },
    });
  });

  it('createPost should create CREATE_POST_REQUEST, CREATE_POST_FAILURE actions when API return 400', () => {
    const expectActions = [
      {
        type: TYPES.CREATE_POST_REQUEST,
      }, {
        type: TYPES.CREATE_POST_FAILURE,
        payload: response400,
      },
    ];

    const store = mockStore({});

    nock(ROOT_URL).post('/v1/posts/').reply(function(uri, body) {
      let response = null;

      if (this.req.headers.authorization[0] !== 'JWT token') {
        response = [401, { detail: 'Authentication credentials were not provided.' }];
      } else if (
        Array.isArray(body.themes) &&
        Array.isArray(body.keywords) &&
        typeof body.content === 'string' &&
        parseInt(body.type, 10) >= 0 && parseInt(body.type, 10) <= 2
        ) {
        response = [201, Object.assign({}, body, { id: 201, date_created: new Date().toJSON() })];
      } else {
        response = [400, {}];
      }

      return response;
    });

    return store.dispatch(ACTIONS.createPost({}, 'token'))
      .then(() => {
        const actions = store.getActions();
        expect(actions).toEqual(expectActions);
      });
  });

  it('createPost should create CREATE_POST_REQUEST, CREATE_POST_SUCCESS actions when API return 201', () => {
    const post = {
      type: 2,
      themes: ['one', 'two'],
      keywords: ['three', 'four'],
      content: 'content',
    };

    const postArgs = {
      id: Math.floor(100 * Math.random()),
      date_created: new Date().toJSON(),
    };

    const expectActions = [
      {
        type: TYPES.CREATE_POST_REQUEST,
      }, {
        type: TYPES.CREATE_POST_SUCCESS,
        payload: { post: Object.assign({}, post, postArgs) },
      },
    ];

    const store = mockStore({});

    nock(ROOT_URL)
      .matchHeader('authorization', val => Array.isArray(val) && val[0] === 'JWT token')
      .post('/v1/posts/', body => (
        Array.isArray(body.themes)
        && Array.isArray(body.keywords)
        && typeof body.content === 'string'
        && parseInt(body.type, 10) >= 0 && parseInt(body.type, 10) <= 2))
      .reply(201, Object.assign({}, post, postArgs));

    return store.dispatch(ACTIONS.createPost(post, 'token'))
      .then(() => {
        const actions = store.getActions();
        expect(actions).toEqual(expectActions);
        expect(actions[1].payload.post).toIncludeKeys(['id', 'date_created']);
      });
  });

  it('deletePostRequest should create DELETE_POST_REQUEST action', () => {
    expect(ACTIONS.deletePostRequest()).toEqual({ type: TYPES.DELETE_POST_REQUEST });
  });

  it('deletePostFaliure should create DELETE_POST_FAILURE action', () => {
    expect(ACTIONS.deletePostFaliure({ response: response401 })).toEqual({
      type: TYPES.DELETE_POST_FAILURE,
      payload: response401,
    });
  });

  it('deletePostSuccess should create DELETE_POST_SUCCESS action', () => {
    expect(ACTIONS.deletePostSuccess(204)).toEqual({
      type: TYPES.DELETE_POST_SUCCESS,
      payload: { id: 204 },
    });
  });

  it('deletePost should create DELETE_POST_REQUEST, DELETE_POST_FAILURE action when API return 401', function() {
    const id = 401;

    const expectActions = [
      {
        type: TYPES.DELETE_POST_REQUEST,
      }, {
        type: TYPES.DELETE_POST_FAILURE,
        payload: response401,
      },
    ];

    nock(ROOT_URL)
      .delete(`/v1/posts/${id}/`)
      .reply(function() {
        let response = null;

        if (this.req.headers.authorization[0] !== 'JWT token') {
          response = [401, { detail: 'Authentication credentials were not provided.' }];
        } else {
          response = [204];
        }

        return response;
      });

    const store = mockStore({});

    return store.dispatch(ACTIONS.deletePost(id, 'bad token'))
      .then(() => {
        const actions = store.getActions();
        expect(actions).toEqual(expectActions);
      });
  });

  it('deletePost should create DELETE_POST_REQUEST, DELETE_POST_SUCCESS actions when API return 204', function() {
    const id = 204;

    const expectActions = [
      {
        type: TYPES.DELETE_POST_REQUEST,
      }, {
        type: TYPES.DELETE_POST_SUCCESS,
        payload: { id },
      },
    ];

    nock(ROOT_URL)
      .delete(`/v1/posts/${id}/`)
      .reply(function() {
        let response = null;

        if (this.req.headers.authorization[0] !== 'JWT token') {
          response = [401, { detail: 'Authentication credentials were not provided.' }];
        } else {
          response = [204];
        }

        return response;
      });

    const store = mockStore({});

    return store.dispatch(ACTIONS.deletePost(id, 'token'))
      .then(() => {
        const actions = store.getActions();
        expect(actions).toEqual(expectActions);
      });
  });

});
