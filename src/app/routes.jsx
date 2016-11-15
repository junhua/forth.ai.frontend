import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './App';
import { Login, NotFound, Home } from '../views';
import { requireAuthentication } from '../utils';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={requireAuthentication(Home)} />
    <Route path="login" component={Login} />
    <Route path="404" component={NotFound} />
  </Route>
);
