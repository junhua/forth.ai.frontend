import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as form } from 'redux-form';
import auth from '../containers/Account/authReducer';
import posts from '../containers/Post/PostsReducer';

const rootReducer = combineReducers({
  routing,
  auth,
  posts,
  form,
});

export default rootReducer;
