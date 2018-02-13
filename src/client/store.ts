import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

const initialStore = (preloadedState) => {
  let store, window;
  const NODE_ENV = process.env.NODE_ENV;
  if (preloadedState) {
    const composeEnhancers = (NODE_ENV === 'development' && __REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ? __REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;
    store = createStore(require('./reducer'), preloadedState, composeEnhancers(applyMiddleware(thunk)));
  } else {
    store = createStore(require('./reducer'), applyMiddleware(thunk));
  }

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducer', () => {
      const nextRootReducer = require('./reducer');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};

export default initialStore;
