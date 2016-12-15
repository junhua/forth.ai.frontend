import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as form } from 'redux-form';
import auth from '../containers/Auth/authReducer';
import post from '../containers/Post/PostsReducer';
import notifications from '../containers/Toast/reducer';
import account from '../containers/Account/reducer';

const rootReducer = combineReducers({
  routing,
  auth,
  post,
  form,
  notifications,
  account,
});

export default rootReducer;
