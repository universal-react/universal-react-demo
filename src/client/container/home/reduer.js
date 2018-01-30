import { UPDATE_USER_LIST, TOOGLE_BLANK_VISIBLE } from './action';
const initialState = {
  list: [],
  blankVisible: true,
};

export default (state = initialState, action) =>  {
  switch (action.type) {
    case UPDATE_USER_LIST:
      return {
        ...state,
        list: action.payload,
      };
      break;
    case TOOGLE_BLANK_VISIBLE:
      return {
        ...state,
        blankVisible: action.payload,
      };
      break;
    default:
      return state;
      break;
  }
};
