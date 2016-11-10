import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './App';
import { Login, NotFound, Home } from '../views';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="login" component={Login} />
    <Route path="404" component={NotFound} />
  </Route>
);
