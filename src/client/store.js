import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducer';

const initialStore = (preloadedState, compose) => {
  let store;
  if (preloadedState) {
    store = createStore(rootReducer, preloadedState, compose);
  } else {
    store = createStore(rootReducer, applyMiddleware(thunk));
  }

  return store;
};

export default initialStore;
