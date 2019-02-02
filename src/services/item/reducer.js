import {
  ITEM_REQUEST,
  ITEM_RESPONSE,
} from './actions';

const initialState = {
  fetching: false,
  valid: false,
  data: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ITEM_REQUEST:
      return Object.assign({}, state, { fetching: true, valid: false });
    case ITEM_RESPONSE:
      return Object.assign({}, state, {
        fetching: false,
        valid: true,
        data: action.data,
      });
    default:
      return state;
  }
};

export default reducer;
