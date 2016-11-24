import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';

import rootReducer from '../reducers';

export default function configureStore(baseHistory, initialState) {
  const routingMiddleware = routerMiddleware(baseHistory);

  let middleware;

  if (process.env.NODE_ENV === 'production') {
    middleware = applyMiddleware(routingMiddleware, thunk);
  } else {
    const logger = createLogger();
    middleware = applyMiddleware(routingMiddleware, thunk, logger);
  }

  // Note: passing middleware as the last argument requires redux@>=3.1.0
  const store = createStore(
    rootReducer,
    initialState,
    compose(middleware)
  );

  const history = syncHistoryWithStore(baseHistory, store);

  if (module.hot) {
    module.hot
    .accept('../reducers', () => {
      const nextRootReducer = require('../reducers/index');

      store.replaceReducer(nextRootReducer);
    });
  }

  return { store, history };
}
