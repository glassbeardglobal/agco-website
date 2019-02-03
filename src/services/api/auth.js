const endpoint = `${process.env.REACT_APP_API_ENDPOINT}`;

export const fetchLogin = (username, password) => {
  return fetch(`${endpoint}/login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  }).then(response => {
    if (response.status >= 400) {
      throw new Error(`Login Failed`);
    }
    return response.json();
  });
}


export const fetchUser = (userId) => {
  return fetch(`${endpoint}/user/${userId}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(response => {
    if (response.status >= 400) {
      throw new Error(`Fetch user failed`);
    }
    return response.json();
  });
}
