import { createReducer } from '../../utils';
import { ADD_NOTIFICATION, REMOVE_NOTIFICATION, CLEAR_NOTIFICATION } from './constants';

const initialState = [];
export default createReducer(initialState, {
  [ADD_NOTIFICATION]: (state, payload) => (
    state.concat([{
      key: payload.key,
      message: payload.message,
      level: payload.level,
      action: payload.action,
      dismissFn: payload.dismissFn,
      args: payload.args,
    }])
  ),
  [REMOVE_NOTIFICATION]: (state, payload) => (
    state.filter(n => n.key !== payload.key)
  ),
  [CLEAR_NOTIFICATION]: () => (initialState),
});
