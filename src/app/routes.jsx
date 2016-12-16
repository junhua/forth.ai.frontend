import React from 'react';
import Route from 'react-router/lib/Route';
import IndexRoute from 'react-router/lib/IndexRoute';
import Redirect from 'react-router/lib/Redirect';

import App from './App';
import { Login, NotFound, Home, OAuthLogin, RegistrationView } from '../views';
import { requireAuthentication } from '../utils';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={requireAuthentication(Home)} />
    <Route path="signup" component={RegistrationView} />
    <Route path="login" component={Login} />
    <Route path=":OAuth/login" component={OAuthLogin} />
    <Route path="404" component={NotFound} />
    <Redirect from="*" to="404" />
  </Route>
);
