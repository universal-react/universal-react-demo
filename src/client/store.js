import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const initialStore = (preloadedState, compose) => {
  let store, window;
  if (preloadedState) {
    const composeEnhancers = __REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
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
