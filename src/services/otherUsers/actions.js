import { fetchUsers } from 'services/api/user';

export const USER_REQUEST = 'USER_REQUESTFDSFDFS';
export const USER_RESPONSE = 'USER_RESPONSEFDFSD';

function requestUsers() {
  return {
    type: USER_REQUEST,
  };
}

function receiveUsers(data) {
  return {
    type: USER_RESPONSE,
    data,
  };
}

export function getUsers() {
  return dispatch => {
    dispatch(requestUsers());
    fetchUsers().then(data => dispatch(receiveUsers(data)), () => dispatch(receiveUsers(null)));
  };
}
