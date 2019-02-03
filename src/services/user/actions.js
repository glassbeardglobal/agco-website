import { fetchLogin, fetchUser } from 'services/api/auth';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const USER_RESPONSE = 'USER_RESPONSE';

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

export function login(username, password) {
  return dispatch => {
    dispatch(requestLogin());
    fetchLogin(username, password).then(data => dispatch(receiveLogin(data)), () => dispatch(loginFailure()));
  };
}

function recieveUser(data) {
  return {
    type: USER_RESPONSE,
    data,
  };
}

export function getUser(userId) {
  return dispatch => {
    console.log("FETCHING USER");
    fetchUser(userId).then(data => dispatch(recieveUser(data)), err => console.log(err));
  };
}
