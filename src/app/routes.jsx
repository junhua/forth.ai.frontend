import React from 'react';
import { Route } from 'react-router';

import App from './App';
import { LoginView, NotFound } from '../views';

export default (
  <Route path="/" component={App}>
    <Route path="login" component={LoginView} />
    <Route path="404" component={NotFound} />
  </Route>
);
