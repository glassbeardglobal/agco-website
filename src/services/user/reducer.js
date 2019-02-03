import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  USER_RESPONSE,
} from './actions';

const initialState = {
  fetching: false,
  valid: false,
  loginSuccessful: true,
  data: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return Object.assign({}, state, { fetching: true, valid: false });
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        fetching: false,
        valid: true,
        data: action.data,
        loginSuccessful: true,
      });
    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        fetching: false,
        loginSuccessful: false,
        data: null,
      });
    case USER_RESPONSE:
      return Object.assign({}, state, {
        data: action.data,
      }); 
    default:
      return state;
  }
};

export default reducer;
