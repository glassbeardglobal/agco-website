const endpoint = `${process.env.REACT_APP_API_ENDPOINT}/portfolio/upload`;

export const uploadImage = (data, image) => {
  const formData = new FormData();
  formData.append('title', data.title);
  formData.append('location', data.location);
  formData.append('description', data.description);
  formData.append('image', image);

  return fetch(endpoint, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
    },
    credentials: 'include',
    body: formData,
  });
}
