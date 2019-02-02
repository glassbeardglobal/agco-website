import { login as postLogin } from 'services/api/login';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_RESPONSE = 'LOGIN_RESPONSE';

function requestLogin() {
  return {
    type: LOGIN_REQUEST,
  };
}

function receiveLogin(data, err) {
  return {
    type: LOGIN_RESPONSE,
    data,
    err
  };
}

export function login(body) {
  return dispatch => {
    dispatch(requestLogin());
    postLogin(body)
      .then(data => dispatch(receiveLogin(null, data)))
      .catch(err => dispatch(receiveLogin(err, null)));
  };
}
