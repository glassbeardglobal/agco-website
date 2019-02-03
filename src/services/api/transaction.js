const endpoint = `${process.env.REACT_APP_API_ENDPOINT}`;

export const fetchTransactions = () => {
  return fetch(`${endpoint}/transaction`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(response => {
    if (response.status >= 400) {
      throw new Error(`Error fetching transactions`);
    }
    return response.json();
  });
}
