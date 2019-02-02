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
