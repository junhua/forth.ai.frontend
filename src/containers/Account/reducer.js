import {
  FETCH_ACCOUNTS_REQUEST, FETCH_ACCOUNTS_SUCCESS, FETCH_ACCOUNTS_FAILURE,
  SET_SELECTED_ACCOUNT } from './constants';
import { createReducer } from '../../utils';

const initialState = {
  inProgress: false,
  all: [],
  selected: {},
};

export default createReducer(initialState, {
  [FETCH_ACCOUNTS_REQUEST]: state => (
    Object.assign({}, state, { inProgress: true })
  ),
  [FETCH_ACCOUNTS_SUCCESS]: (state, payload) => (
    Object.assign({}, state, {
      inProgress: false,
      all: payload.accounts,
      selected: (Array.isArray(payload.accounts) && payload.accounts[0]) || null,
    })
  ),
  [FETCH_ACCOUNTS_FAILURE]: state => (
    Object.assign({}, state, { inProgress: false })
  ),

  [SET_SELECTED_ACCOUNT]: (state, payload) => (
    Object.assign({}, state, {
      selected: payload.account,
    })
  ),
});
