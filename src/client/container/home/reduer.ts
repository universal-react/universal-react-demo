import { ActionTypes, TOOGLE_BLANK_VISIBLE, UPDATE_USER_LIST } from './action';

const { UPDATE_STORE } = ActionTypes;

const initialState = {
  list: [],
  blankVisible: true,
};

export default (state = initialState, action) =>  {
  switch (action.type) {
    case UPDATE_STORE:
      return {
        ...state,
        id: 100,
      };
    case UPDATE_USER_LIST:
      return {
        ...state,
        list: action.payload,
      };
    case TOOGLE_BLANK_VISIBLE:
      return {
        ...state,
        blankVisible: action.payload,
      };
    default:
      return state;
  }
};
