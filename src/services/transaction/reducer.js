import normalize from '../normalize.js';

import {
  TRANSACTION_REQUEST,
  TRANSACTION_RESPONSE,
} from './actions';

const initialState = {
  fetching: false,
  valid: false,
  data: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TRANSACTION_REQUEST:
      return Object.assign({}, state, { fetching: true, valid: false });
    case TRANSACTION_RESPONSE:
      return Object.assign({}, state, {
        fetching: false,
        valid: true,
        data: normalize(action.data),
      });
    default:
      return state;
  }
};

export default reducer;
