import { fetchLogin } from 'services/api/auth';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

function requestLogin() {
  return {
    type: LOGIN_REQUEST,
  };
}

function receiveLogin(data) {
  return {
    type: LOGIN_SUCCESS,
    data,
  };
}

function loginFailure() {
  return {
    type: LOGIN_FAILURE,
  };
}

export function login() {
  return dispatch => {
    dispatch(requestLogin());
    fetchLogin().then(data => dispatch(receiveLogin(data)), () => dispatch(loginFailure()));
  };
}
