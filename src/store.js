import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducer';

const initialStore = (preloadedState) => {
  if (preloadedState) {
    return createStore(rootReducer, preloadedState, applyMiddleware(thunk));
  } else {
    return createStore(rootReducer, applyMiddleware(thunk));
  }
};

export default initialStore;


