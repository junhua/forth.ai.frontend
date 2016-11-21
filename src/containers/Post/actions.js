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

const ROOT_URL = 'http://192.168.99.100:8000';

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


export function createPostRequest() {
  return { type: CREATE_POST_REQUEST };
}

export function createPostFailure(error) {
  return {
    type: CREATE_POST_FAILURE,
    payload: { error },
  };
}

export function createPostSuccess(data) {
  return {
    type: CREATE_POST_SUCCESS,
    payload: { data },
  };
}

export function createPost(type = 2, themes = [], keywords = [], content) {
  return (dispatch) => {
    dispatch(createPostRequest());

    const config = {
      method: 'POST',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ type, themes, keywords, content }),
    };

    return fetch(`${ROOT_URL}/v1/posts/`, config)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((response) => {
        dispatch(createPostSuccess(response));
      })
      .catch((error) => {
        dispatch(createPostFailure(error));
      });
  };
}

export function deletePostRequest() {
  return { type: DELETE_POST_REQUEST };
}

export function deletePostFaliure(error) {
  return {
    type: DELETE_POST_FAILURE,
    payload: { error },
  };
}

export function deletePostSuccess(id) {
  return {
    type: DELETE_POST_SUCCESS,
    payload: { id },
  };
}

export function deletePost(id) {
  return (dispatch) => {
    dispatch(deletePostRequest());

    const config = {
      method: 'DELETE',
      credentials: 'include',
    };

    return fetch(`${ROOT_URL}/v1/posts/${id}/`, config)
      .then(delay(1000))
      .then(checkHttpStatus)
      .then(() => {
        dispatch(deletePostSuccess(id));
      })
      .catch((error) => {
        dispatch(deletePostFaliure(error));
      });
  };
}
