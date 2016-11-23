import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

import App from './App';
import { Login, NotFound, Home, OAuthLogin } from '../views';
import { requireAuthentication } from '../utils';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={requireAuthentication(Home)} />
    <Route path="login" component={Login} />
    <Route path="home" component={Home} />
    <Route path=":OAuth/login" component={OAuthLogin} />
    <Route path="404" component={NotFound} />
    <Redirect from="*" to="404" />
  </Route>
);
