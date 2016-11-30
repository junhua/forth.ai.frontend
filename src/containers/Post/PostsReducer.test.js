import expect from 'expect';
import postsReducer from './PostsReducer';
import * as ACTIONS from './actions';

describe('Post reducers', () => {

  const response400 = {
    status: 400,
    statusText: 'Bad Request',
  };

  const response401 = {
    status: 401,
    statusText: 'Unauthorized',
  };

  const initialState = {
    isFetching: false,
    allPost: [],
    singlePost: {},
    error: '',
  };

  it('should return initial state', () => {
    expect(postsReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle FETCH_POSTS_REQUEST', () => {
    expect(postsReducer(initialState, ACTIONS.fetchPostsRequest()))
    .toEqual({
      isFetching: true,
      allPost: initialState.allPost,
      singlePost: {},
      error: '',
    });
  });

  it('should handle FETCH_POSTS_SUCCESS', () => {
    const posts = [{ data: 'data' }];

    expect(postsReducer(initialState, ACTIONS.fetchPostsSuccess(posts)))
    .toEqual({
      isFetching: false,
      allPost: posts,
      singlePost: {},
      error: '',
    });
  });

  it('should handle FETCH_POSTS_FAILURE', () => {
    expect(postsReducer(initialState, ACTIONS.fetchPostsFailure({ response: response401 })))
    .toEqual({
      isFetching: false,
      allPost: initialState.allPost,
      singlePost: {},
      error: response401,
    });
  });

  it('should handle UPDATE_POST_REQUEST', () => {
    expect(postsReducer(initialState, ACTIONS.updatePostRequest()))
    .toEqual({
      isFetching: true,
      allPost: initialState.allPost,
      singlePost: {},
      error: '',
    });
  });

  it('should handle UPDATE_POST_FAILURE', () => {
    expect(postsReducer(initialState, ACTIONS.updatePostFailure({ response: response400 })))
    .toEqual({
      isFetching: false,
      allPost: initialState.allPost,
      singlePost: {},
      error: response400,
    });
  });

  it('should handle UPDATE_POST_SUCCESS', () => {
    const updatePost = { id: 200, data: 'new data' };
    const state = {
      isFetching: true,
      allPost: [{ id: 200, data: 'old data' }],
      singlePost: {},
      error: '',
    };

    expect(postsReducer(state, ACTIONS.updatePostSuccess(updatePost)))
    .toEqual({
      isFetching: false,
      allPost: state.allPost.map(post => (post.id === updatePost.id ? updatePost : post)),
      singlePost: {},
      error: '',
    });
  });

  it('should handle CREATE_POST_REQUEST', () => {
    expect(postsReducer(initialState, ACTIONS.createPostRequest()))
    .toEqual({
      isFetching: true,
      allPost: initialState.allPost,
      singlePost: {},
      error: '',
    });
  });

  it('should handle CREATE_POST_FAILURE', () => {
    expect(postsReducer(initialState, ACTIONS.createPostFailure({ response: response400 })))
    .toEqual({
      isFetching: false,
      allPost: initialState.allPost,
      singlePost: {},
      error: response400,
    });
  });

  it('should handle CREATE_POST_SUCCESS', () => {
    const newPost = { data: 'new data' };

    expect(postsReducer(initialState, ACTIONS.createPostSuccess(newPost)))
    .toEqual({
      isFetching: false,
      allPost: initialState.allPost.concat([newPost]),
      singlePost: {},
      error: '',
    });
  });

  it('should handle DELETE_POST_REQUEST', () => {
    expect(postsReducer(initialState, ACTIONS.deletePostRequest()))
    .toEqual({
      isFetching: true,
      allPost: initialState.allPost,
      singlePost: {},
      error: '',
    });
  });

  it('should handle DELETE_POST_FAILURE', () => {
    expect(postsReducer(initialState, ACTIONS.deletePostFaliure({ response: response401 })))
    .toEqual({
      isFetching: false,
      allPost: initialState.allPost,
      singlePost: {},
      error: response401,
    });
  });

  it('should handle DELETE_POST_SUCCESS', () => {
    const delPost = { id: 204, data: 'will be deleted' };
    const state = {
      isFetching: true,
      allPost: [delPost],
      singlePost: {},
      error: '',
    };

    expect(postsReducer(state, ACTIONS.deletePostSuccess(delPost.id)))
    .toEqual({
      isFetching: false,
      allPost: state.allPost.filter(post => post.id !== delPost.id),
      singlePost: {},
      error: '',
    });
  });
});
