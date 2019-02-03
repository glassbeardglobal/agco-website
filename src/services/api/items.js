import store from '../store';

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

export const uploadItem = (data) => {
  console.log(store.getState().user.data._id);
  const formData = new FormData();
  formData.append('name', data.name);
  formData.append('manufacturer', data.manufacturer);
  formData.append('compatibility', data.compatibility);
  formData.append('description', data.description);
  formData.append('condition', data.condition);
  formData.append('year', data.year);
  formData.append('price', data.price);
  formData.append('image', data.file);
  formData.append('userId', store.getState().user.data._id);

  return fetch(`${endpoint}/item`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
    },
    body: formData,
  }).then(response => {
    if (response.status >= 400) {
      throw new Error('Whoops :(');
    }
    return null;
  });
}

export const toggleSelling = (itemId, forSale) => {
  return fetch(`${endpoint}/item/${itemId}/toggle`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
    },
    body: JSON.stringify({ forSale }),
  }).then(response => {
    if (response.status >= 400) {
      throw new Error('Whoops :(');
    }
    return null;
  });
}
