import fetch from 'isomorphic-fetch';
import {
  FETCH_POSTS_REQUEST, FETCH_POSTS_FAILURE, FETCH_POSTS_SUCCESS,
  // FETCH_POST_REQUEST, FETCH_POST_FAILURE, FETCH_POST_SUCCESS,
  UPDATE_POST_REQUEST, UPDATE_POST_FAILURE, UPDATE_POST_SUCCESS,
  CREATE_POST_REQUEST, CREATE_POST_FAILURE, CREATE_POST_SUCCESS,
  DELETE_POST_REQUEST, DELETE_POST_FAILURE, DELETE_POST_SUCCESS,
} from './constants';
// import { loginFailure } from '../Account/actions';
import { fetchJSON, checkHttpStatus, delay, ROOT_URL } from '../../utils';

export function fetchPostsRequest() {
  return { type: FETCH_POSTS_REQUEST };
}

export function fetchPostsFailure(error) {
  return {
    type: FETCH_POSTS_FAILURE,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText,
    },
  };
}

export function fetchPostsSuccess(posts) {
  return {
    type: FETCH_POSTS_SUCCESS,
    payload: { posts },
  };
}

export function fetchPosts(token) {
  return (dispatch) => {
    dispatch(fetchPostsRequest());
    const config = {
      method: 'GET',
      credentials: 'include',
      headers: {
        Authorization: `JWT ${token}`,
      },
    };

    return fetchJSON(`${ROOT_URL}/v1/posts/`, config)
      .then(delay(1000))
      .then((response) => {
        dispatch(fetchPostsSuccess(response));
      })
      .catch((error) => {
        dispatch(fetchPostsFailure(error));
      });
  };
}


export function updatePostRequest() {
  return { type: UPDATE_POST_REQUEST };
}

export function updatePostFailure(error) {
  return {
    type: UPDATE_POST_FAILURE,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText,
    },
  };
}

export function updatePostSuccess(post) {
  return {
    type: UPDATE_POST_SUCCESS,
    payload: { post },
  };
}

export function updatePost(post) {
  return (dispatch) => {
    dispatch(updatePostRequest());

    const config = {
      method: 'PUT',
      credentials: 'include',
      body: JSON.stringify(post),
    };

    return fetchJSON(`${ROOT_URL}/v1/posts/${post.id}/`, config)
      .then((response) => {
        dispatch(updatePostSuccess(response));
      })
      .catch((error) => {
        dispatch(updatePostFailure(error));
      });
  };
}


export function createPostRequest() {
  return { type: CREATE_POST_REQUEST };
}

export function createPostFailure(error) {
  return {
    type: CREATE_POST_FAILURE,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText,
    },
  };
}

export function createPostSuccess(post) {
  return {
    type: CREATE_POST_SUCCESS,
    payload: { post },
  };
}

export function createPost(type = 2, themes = [], keywords = [], content) {
  return (dispatch) => {
    dispatch(createPostRequest());

    const config = {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({ type, themes, keywords, content }),
    };

    return fetchJSON(`${ROOT_URL}/v1/posts/`, config)
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
