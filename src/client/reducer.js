import { combineReducers } from 'redux';
import HomeReducer from './container/home/reduer';
import Error from './components/error/reducer';

const rootReducer = combineReducers({
  home: HomeReducer,
  error: Error,
});

module.exports = rootReducer;
