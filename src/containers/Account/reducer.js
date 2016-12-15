import {
  FETCH_ACCOUNTS_REQUEST, FETCH_ACCOUNTS_SUCCESS, FETCH_ACCOUNTS_FAILURE,
  SET_SELECTED_ACCOUNT } from './constants';
import { createReducer } from '../../utils';

const initialState = {
  isFetching: false,
  accounts: [],
  selected: {},
};

export default createReducer(initialState, {
  [FETCH_ACCOUNTS_REQUEST]: state => (
    Object.assign({}, state, { isFetching: true })
  ),
  [FETCH_ACCOUNTS_SUCCESS]: (state, payload) => (
    Object.assign({}, state, {
      isFetching: false,
      accounts: payload.accounts,
      selected: (Array.isArray(payload.accounts) && payload.accounts[0]) || null,
    })
  ),
  [FETCH_ACCOUNTS_FAILURE]: state => (
    Object.assign({}, state, { isFetching: false })
  ),

  [SET_SELECTED_ACCOUNT]: (state, payload) => (
    Object.assign({}, state, {
      selected: payload.account,
    })
  ),
});
