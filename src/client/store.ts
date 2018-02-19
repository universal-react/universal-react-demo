import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

const initialStore = (preloadedState?: any) => {
  let store;
  // tslint:disable-next-line:prefer-const
  let window;
  const NODE_ENV = process.env.NODE_ENV;
  if (preloadedState) {
    const RDEC = __REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    const composeEnhancers = (NODE_ENV === 'development' && RDEC) ? RDEC : compose;
    store = createStore(
      require('./reducer'),
      preloadedState,
      composeEnhancers(applyMiddleware(thunk))
    );
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
