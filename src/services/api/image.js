const endpoint = `${process.env.REACT_APP_API_ENDPOINT}/portfolio`;

export const fetchImages = (limit, skip) => {
  return fetch(`${endpoint}?limit=${limit ? limit : 0}&skip=${skip ? skip : 0}`, {
    method: 'GET',
    headers: { Accept: 'application/json' },
  }).then(response => {
    if (response.status >= 400) {
      throw new Error('Error fetching images');
    }
    return response.json();
  });
}

export const fetchImageById = (id) => {
  return fetch(`${endpoint}/${id}`, {
    method: 'GET',
    headers: { Accept: 'application/json' },
  }).then(response => {
    if (response.status >= 400) {
      throw new Error(`Error fetching image ${id}`);
    }
    return response.json();
  });
}

export const updateImageById = (id, body) => {
  return fetch(`${endpoint}/${id}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(body),
  }).then(response => {
    if (response.status >= 400) {
      throw new Error(`Error fetching image ${id}`);
    }
    return response.json();
  });
}
