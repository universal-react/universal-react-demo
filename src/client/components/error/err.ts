import { THROW_ERR } from './action';

const initialState = {
  message: '',
  stack: '',
};

export default (state = initialState, action) =>  {
  switch (action.type) {
    case THROW_ERR:
      return {
        ...state,
        ...action.payload,
      };
    default:
      break;
  }
};
