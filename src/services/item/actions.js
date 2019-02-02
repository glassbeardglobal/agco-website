import { fetchItems } from 'services/api/items';

export const ITEM_REQUEST = 'ITEM_REQUEST';
export const ITEM_RESPONSE = 'ITEM_RESPONSE';

function requestItems() {
  return {
    type: ITEM_REQUEST,
  };
}

function receiveItems(data) {
  return {
    type: ITEM_RESPONSE,
    data,
  };
}

export function getItems() {
  return dispatch => {
    dispatch(requestItems());
    fetchItems().then(data => dispatch(receiveItems(data)), () => dispatch(receiveItems(null)));
  };
}
