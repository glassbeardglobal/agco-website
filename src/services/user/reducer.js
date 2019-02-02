import { LOGIN_REQUEST, LOGIN_RESPONSE } from './actions';

const initialState = {
  fetching: false,
  err: null,
  data: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return Object.assign({}, state, { fetching: true, err: null, data: null });
    case LOGIN_RESPONSE:
      return Object.assign({}, state, { fetching: false, err: action.err, data: action.data });
    default:
      return state;
  }
};

export default reducer;
