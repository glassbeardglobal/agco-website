const endpoint = `${process.env.REACT_APP_API_ENDPOINT}/featured`;

export const fetchFeatured = () => {
  return fetch(`${endpoint}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  }).then(response => {
    if (response.status >= 400) {
      throw new Error(`Error fetching featured images`);
    }
    return response.json();
  });
}

export const uploadFeatured = (ref, image) => {
  const formData = new FormData();
  formData.append('ref', ref);
  formData.append('image', image);

  return fetch(`${endpoint}/upload`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
    },
    credentials: 'include',
    body: formData,
  });
}
