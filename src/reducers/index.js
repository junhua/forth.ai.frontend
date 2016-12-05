import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as form } from 'redux-form';
import auth from '../containers/Account/authReducer';
import posts from '../containers/Post/PostsReducer';
import notifications from '../containers/Toast/reducer';

const rootReducer = combineReducers({
  routing,
  auth,
  posts,
  form,
  notifications,
});

export default rootReducer;
