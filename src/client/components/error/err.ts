import * as Action from './action';


const initialState = {
  message: '',
  stack: '',
};

export default (state = initialState, action) =>  {
  switch (action.type) {
    case Action.THROW_ERR:
      return {
        ...state,
        ...action.payload,
      }
    default:
      break;
  }
};
