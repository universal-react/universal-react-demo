import { combineReducers } from 'redux';
import HomeReducer from './container/home/reduer';

const rootReducer = combineReducers({
  home: HomeReducer,
});

export default rootReducer;
