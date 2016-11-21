import fetch from 'isomorphic-fetch';
import {
  FETCH_POSTS_REQUEST, FETCH_POSTS_FAILURE, FETCH_POSTS_SUCCESS,
  // FETCH_POST_REQUEST, FETCH_POST_FAILURE, FETCH_POST_SUCCESS,
  UPDATE_POST_REQUEST, UPDATE_POST_FAILURE, UPDATE_POST_SUCCESS,
  CREATE_POST_REQUEST, CREATE_POST_FAILURE, CREATE_POST_SUCCESS,
  DELETE_POST_REQUEST, DELETE_POST_FAILURE, DELETE_POST_SUCCESS,
} from './constants';
// import { loginFailure } from '../Account/actions';
import { checkHttpStatus, parseJSON, delay } from '../../utils';

export function fetchPostsRequest() {
  return { type: FETCH_POSTS_REQUEST };
}

export function fetchPostsFailure(error) {
  return {
    type: FETCH_POSTS_FAILURE,
    payload: { error },
  };
}

export function fetchPostsSuccess(data) {
  return {
    type: FETCH_POSTS_SUCCESS,
    payload: { data },
  };
}

export function fetchPosts() {
  return (dispatch) => {
    dispatch(fetchPostsRequest());
    const config = {
      method: 'GET',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
    return fetch('http://192.168.99.100:8000/v1/posts/', config)
      .then(delay(1000))
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((response) => {
        dispatch(fetchPostsSuccess(response));
      })
      .catch((error) => {
        dispatch(fetchPostsFailure(error));
      });
  };
}


export function postUpdateRequest() {
  return { type: UPDATE_POST_REQUEST };
}

export function postUpdateFailure() {
  return { type: UPDATE_POST_FAILURE };
}

export function postUpdateSuccess() {
  return { type: UPDATE_POST_SUCCESS };
}


export function postCreateRequest() {
  return { type: CREATE_POST_REQUEST };
}

export function postCreateFailure() {
  return { type: CREATE_POST_FAILURE };
}

export function postCreateSuccess() {
  return { type: CREATE_POST_SUCCESS };
}


export function postDeleteRequest() {
  return { type: DELETE_POST_REQUEST };
}

export function postDeleteFaliure() {
  return { type: DELETE_POST_FAILURE };
}

export function postDeleteSuccess() {
  return { type: DELETE_POST_SUCCESS };
}
