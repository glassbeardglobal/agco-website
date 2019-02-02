import normalize from '../normalize.js';

import {
  USER_REQUEST,
  USER_RESPONSE,
} from './actions';

const initialState = {
  fetching: false,
  valid: false,
  data: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_REQUEST:
      return Object.assign({}, state, { fetching: true, valid: false });
    case USER_RESPONSE:
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
