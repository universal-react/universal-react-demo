import { THROW_ERR } from './action';

const initialState = {
  err: {},
}

export default (state = initialState, action) => {
  switch (action.type) {

  case THROW_ERR:
    return { ...state, err: action.payload };

  default:
    return state;
  }
}
