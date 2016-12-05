import { ADD_NOTIFICATION, REMOVE_NOTIFICATION, CLEAR_NOTIFICATION } from './constants';

let nextNotificationId = 0;
export function addNotification(message, level = 'info', action, dismissFn, args = []) {
  nextNotificationId += 1;
  return {
    type: ADD_NOTIFICATION,
    payload: {
      key: nextNotificationId,
      message,
      level,  // bgColors
      action: action && String(action).toUpperCase(),  // ex: labl "undo", "close",
      dismissFn,
      args,
    },
  };
}

export function removeNotification(key) {
  return {
    type: REMOVE_NOTIFICATION,
    payload: { key },
  };
}

export function clearNotification() {
  return { type: CLEAR_NOTIFICATION };
}
