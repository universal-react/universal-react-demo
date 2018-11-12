import { combineReducers } from 'redux';
import Error from './components/error/reducer';
import HomeReducer from './container/home/reduer';

const rootReducer = combineReducers({
  home: HomeReducer,
  error: Error,
});

export default rootReducer;
