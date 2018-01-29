import { UPDATE_USER_LIST } from './action';
const initialState = {
  list: [],
};

export default (state = initialState, action) =>  {
  switch (action.type) {
    case UPDATE_USER_LIST:
      return Object.assign(state, {
        list: payload,
      });
      break;
    default:
      return state;
      break;
  }
};
