const endpoint = `${process.env.REACT_APP_API_ENDPOINT}/login`;

export const login = body => {
  return fetch(endpoint, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
    },
    body: JSON.stringify(body),
  }).then(response => {
    if (response.status >= 400) {
      throw new Error('Error logging in');
    }
    return response.json();
  });
}
