import { createReducer } from '../../utils';
import {
  FETCH_POSTS_REQUEST, FETCH_POSTS_FAILURE, FETCH_POSTS_SUCCESS,
  UPDATE_POST_REQUEST, UPDATE_POST_FAILURE, UPDATE_POST_SUCCESS,
  CREATE_POST_REQUEST, CREATE_POST_FAILURE, CREATE_POST_SUCCESS,
  DELETE_POST_REQUEST, DELETE_POST_FAILURE, DELETE_POST_SUCCESS,
} from './constants';

const initialState = {
  isFetching: false,
  allPost: [],
  singlePost: {},
  error: '',
};

export default createReducer(initialState, {
  [FETCH_POSTS_REQUEST]: state => (
    Object.assign({}, state, {
      isFetching: true,
    })
  ),
  [FETCH_POSTS_SUCCESS]: (state, payload) => (
    Object.assign({}, state, {
      isFetching: false,
      allPost: payload.posts,
      error: '',
    })
  ),
  [FETCH_POSTS_FAILURE]: (state, payload) => (
    Object.assign({}, state, {
      isFetching: false,
      error: payload,
    })
  ),

  [UPDATE_POST_REQUEST]: state => (
    Object.assign({}, state, {
      isFetching: true,
    })
  ),
  [UPDATE_POST_FAILURE]: (state, payload) => (
    Object.assign({}, state, {
      isFetching: false,
      error: payload,
    })
  ),
  [UPDATE_POST_SUCCESS]: (state, payload) => (
    Object.assign({}, state, {
      isFetching: false,
      allPost: state.allPost.map(post => (post.id === payload.post.id ? payload.post : post)),
      error: '',
    })
  ),


  [CREATE_POST_REQUEST]: state => (
    Object.assign({}, state, {
      isFetching: true,
    })
  ),
  [CREATE_POST_FAILURE]: (state, payload) => (
    Object.assign({}, state, {
      isFetching: false,
      error: payload,
    })
  ),
  [CREATE_POST_SUCCESS]: (state, payload) => (
    Object.assign({}, state, {
      isFetching: false,
      allPost: state.allPost.concat([payload.post]),
      error: '',
    })
  ),

  [DELETE_POST_REQUEST]: state => (
    Object.assign({}, state, {
      isFetching: true,
    })
  ),
  [DELETE_POST_FAILURE]: (state, payload) => (
    Object.assign({}, state, {
      isFetching: false,
      error: payload,
    })
  ),
  [DELETE_POST_SUCCESS]: (state, payload) => (
    Object.assign({}, state, {
      isFetching: false,
      allPost: state.allPost.filter(post => post.id !== payload.id),
      error: '',
    })
  ),

});
