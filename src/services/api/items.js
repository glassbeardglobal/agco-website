const endpoint = `${process.env.REACT_APP_API_ENDPOINT}`;

export const fetchItems = () => {
  return fetch(`${endpoint}/item`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(response => {
    if (response.status >= 400) {
      throw new Error(`Error fetching items`);
    }
    return response.json();
  });
}
