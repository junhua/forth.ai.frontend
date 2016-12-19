import fetch from 'isomorphic-fetch';
import {
  FETCH_POSTS_REQUEST, FETCH_POSTS_FAILURE, FETCH_POSTS_SUCCESS,
  // FETCH_POST_REQUEST, FETCH_POST_FAILURE, FETCH_POST_SUCCESS,
  UPDATE_POST_REQUEST, UPDATE_POST_FAILURE, UPDATE_POST_SUCCESS,
  CREATE_POST_REQUEST, CREATE_POST_FAILURE, CREATE_POST_SUCCESS,
  DELETE_POST_REQUEST, DELETE_POST_FAILURE, DELETE_POST_SUCCESS,
  SHARE_POST_REQUEST, SHARE_POST_FAILURE, SHARE_POST_SUCCESS,
} from './constants';
// import { loginFailure } from '../Auth/actions';
import { fetchJSON, checkHttpStatus, ROOT_URL } from '../../utils';
import { addNotification } from '../Toast/actions';

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
    payload: posts,
  };
}

export function fetchPosts(token, qs) {
  return (dispatch) => {
    dispatch(fetchPostsRequest());
    const config = {
      method: 'GET',
      credentials: 'include',
      headers: { Authorization: `JWT ${token}` },
    };

    const query = qs ? `?${qs}` : '';
    return fetchJSON(`${ROOT_URL}/v1/posts/${query}`, config)
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
    payload: post,
  };
}

export function updatePost(post, token) {
  return (dispatch) => {
    dispatch(updatePostRequest());

    const config = {
      method: 'PUT',
      credentials: 'include',
      body: JSON.stringify(post),
      headers: { Authorization: `JWT ${token}` },
    };

    return fetchJSON(`${ROOT_URL}/v1/posts/${post.id}/`, config)
      .then((response) => {
        dispatch(updatePostSuccess(response));
        dispatch(addNotification('Update Post successfully.', 'info', 'close'));
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

export function createPostSuccess(posts) {
  return {
    type: CREATE_POST_SUCCESS,
    payload: { posts },
  };
}

export function createPost(post, token) {
  return (dispatch) => {
    dispatch(createPostRequest());

    const config = {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(post),
      headers: { Authorization: `JWT ${token}` },
    };

    return fetchJSON(`${ROOT_URL}/v1/posts/`, config)
      .then((response) => {
        dispatch(createPostSuccess(response.posts));
        dispatch(addNotification('Create Post successfully.', 'info', 'close'));
      })
      .catch((error) => {
        dispatch(createPostFailure(error));
      });
  };
}

export function deletePostRequest() {
  return { type: DELETE_POST_REQUEST };
}

export function deletePostFailure(error) {
  return {
    type: DELETE_POST_FAILURE,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText,
    },
  };
}

export function deletePostSuccess(id) {
  return {
    type: DELETE_POST_SUCCESS,
    payload: { id },
  };
}

export function deletePost(id, token) {
  return (dispatch) => {
    dispatch(deletePostRequest());

    const config = {
      method: 'DELETE',
      credentials: 'include',
      headers: { Authorization: `JWT ${token}` },
    };

    return fetch(`${ROOT_URL}/v1/posts/${id}/`, config)
      .then(checkHttpStatus)
      .then(() => {
        dispatch(deletePostSuccess(id));
        dispatch(addNotification('Remove Post successfully.', 'info', 'close'));
      })
      .catch((error) => {
        dispatch(deletePostFailure(error));
      });
  };
}

export function sharePostRequest() {
  return {
    type: SHARE_POST_REQUEST,
  };
}

export function sharePostFailure(error) {
  return {
    type: SHARE_POST_FAILURE,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText,
    },
  };
}

export function sharePostSuccess(post) {
  return {
    type: SHARE_POST_SUCCESS,
    payload: post,
  };
}

export function sharePost(post, token) {
  return (dispatch) => {
    dispatch(sharePostRequest());

    const config = {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(post),
      headers: { Authorization: `JWT ${token}` },
    };

    return fetchJSON(`${ROOT_URL}/v1/posts/${post.id}/existed_post/`, config)
      .then((response) => {
        dispatch(sharePostSuccess(response));
      })
      .catch((error) => {
        dispatch(sharePostFailure(error));
      });
  };
}
