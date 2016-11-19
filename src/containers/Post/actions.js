import fetch from 'isomorphic-fetch';
import {
  POST_FETCH_REQUEST, POST_FETCH_FAILURE, POST_FETCH_SUCCESS,
  POST_UPDATE_REQUEST, POST_UPDATE_FAILURE, POST_UPDATE_SUCCESS,
  POST_CREATE_REQUEST, POST_CREATE_FAILURE, POST_CREATE_SUCCESS,
  POST_DELETE_REQUEST, POST_DELETE_FAILURE, POST_DELETE_SUCCESS,
} from './constants';
// import { loginFailure } from '../Account/actions';
import { checkHttpStatus, parseJSON, delay } from '../../utils';

export function postFetchRequest() {
  return { type: POST_FETCH_REQUEST };
}

export function postFetchFailure() {
  return { type: POST_FETCH_FAILURE };
}

export function postFetchSuccess(data) {
  return {
    type: POST_FETCH_SUCCESS,
    payload: { data },
  };
}

export function fetchPost() {
  return (dispatch) => {
    dispatch(postFetchRequest());
    const config = {

    };
    return fetch('http://192.168.99.100:8000/v1/posts/', config)
      .then(delay(2000))
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((response) => {
        dispatch(postFetchSuccess(response));
      })
      .catch((error) => {
        dispatch(POST_FETCH_FAILURE(error));
      });
  };
}


export function postUpdateRequest() {
  return { type: POST_UPDATE_REQUEST };
}

export function postUpdateFailure() {
  return { type: POST_UPDATE_FAILURE };
}

export function postUpdateSuccess() {
  return { type: POST_UPDATE_SUCCESS };
}


export function postCreateRequest() {
  return { type: POST_CREATE_REQUEST };
}

export function postCreateFailure() {
  return { type: POST_CREATE_FAILURE };
}

export function postCreateSuccess() {
  return { type: POST_CREATE_SUCCESS };
}


export function postDeleteRequest() {
  return { type: POST_DELETE_REQUEST };
}

export function postDeleteFaliure() {
  return { type: POST_DELETE_FAILURE };
}

export function postDeleteSuccess() {
  return { type: POST_DELETE_SUCCESS };
}
