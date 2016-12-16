import React from 'react';
import Route from 'react-router/lib/Route';
import IndexRoute from 'react-router/lib/IndexRoute';
import Redirect from 'react-router/lib/Redirect';

import App from './App';
import { Login, NotFound, Home, OAuthLogin, RegistrationView, Redirect as Jump } from '../views';
import { requireAuthentication, nonRequireAuthentication } from '../utils';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={requireAuthentication(Home)} />
    <Route path="signup" component={nonRequireAuthentication(RegistrationView)} />
    <Route path="login" component={nonRequireAuthentication(Login)} />
    <Route path="facebook" component={Jump} />
    <Route path="404" component={NotFound} />
    <Route path=":OAuth/login" component={OAuthLogin} />
    <Redirect from="*" to="404" />
  </Route>
);
