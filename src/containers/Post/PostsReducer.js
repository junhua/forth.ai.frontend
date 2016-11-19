import { createReducer } from '../../utils';
import {
  POST_FETCH_REQUEST, POST_FETCH_FAILURE, POST_FETCH_SUCCESS,
  // POST_UPDATE_REQUEST, POST_UPDATE_FAILURE, POST_UPDATE_SUCCESS,
  POST_CREATE_REQUEST, POST_CREATE_FAILURE, POST_CREATE_SUCCESS,
  // POST_DELETE_REQUEST, POST_DELETE_FAILURE, POST_DELETE_SUCCESS,
} from './constants';

const initialState = {
  isFetching: false,
  allPost: null,
  error: '',
};

export default createReducer(initialState, {
  [POST_FETCH_REQUEST]: state => (
    Object.assign({}, state, {
      isFetching: true,
    })
  ),
  [POST_FETCH_SUCCESS]: (state, payload) => (
    Object.assign({}, state, {
      isFetching: false,
      allPost: payload.data,
      error: '',
    })
  ),
  [POST_FETCH_FAILURE]: (state, payload) => (
    Object.assign({}, state, {
      isFetching: false,
      error: payload.error,
    })
  ),

  [POST_CREATE_REQUEST]: state => (
    Object.assign({}, state, {
      isFetching: true,
    })
  ),
  [POST_CREATE_FAILURE]: (state, payload) => (
    Object.assign({}, state, {
      isFetching: false,
      error: payload.error,
    })
  ),
  [POST_CREATE_SUCCESS]: (state, payload) => (
    Object.assign({}, state, {
      isFetching: false,
      allPost: payload.data,
      error: '',
    })
  ),
});
