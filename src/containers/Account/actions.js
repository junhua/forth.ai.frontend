import {
  FETCH_ACCOUNTS_REQUEST, FETCH_ACCOUNTS_SUCCESS, FETCH_ACCOUNTS_FAILURE,
  SET_SELECTED_ACCOUNT } from './constants';
import { fetchJSON, ROOT_URL } from '../../utils';
import { addNotification } from '../Toast/actions';
import { loginUserFailure } from '../Auth/actions';

export function fetchAccountsRequest() { return { type: FETCH_ACCOUNTS_REQUEST }; }

export function fetchAccountsSuccess(accounts) {
  return {
    type: FETCH_ACCOUNTS_SUCCESS,
    payload: {
      accounts,
    },
  };
}

export function fetchAccountsFailure(error) {
  return {
    type: FETCH_ACCOUNTS_FAILURE,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText,
    },
  };
}

export function fetchAccounts(token) {
  return (dispatch) => {
    dispatch(fetchAccountsRequest());

    const config = {
      method: 'GET',
      credentials: 'include',
      headers: { Authorization: `JWT ${token}` },
    };

    return fetchJSON(`${ROOT_URL}/v1/pages/`, config)
      .then((response) => {
        dispatch(fetchAccountsSuccess(response));
      })
      .catch((error) => {
        if (error.response.status >= 500) {
          dispatch(fetchAccountsFailure(error));
          dispatch(addNotification('The server is currently undergoing maintainence. Try again later!'));
          dispatch(loginUserFailure(error));
        } else {
          dispatch(fetchAccountsFailure(error));
        }
      });
  };
}

export function setSelectedAccount(account) {
  return {
    type: SET_SELECTED_ACCOUNT,
    payload: { account },
  };
}
