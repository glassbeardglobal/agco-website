export const SEARCH = 'SEARCH';
export const ADD_FILTER = 'ADD_FILTER';
export const REMOVE_FILTER = 'REMOVE_FILTER';

export function search(query, setDirty=true) {
  return {
    type: SEARCH,
    query,
    setDirty,
  };
}

export function addFilter(filter) {
  return {
    type: ADD_FILTER,
    filter,
  };
}

export function removeFilter(filter) {
  return {
    type: REMOVE_FILTER,
    filter,
  };
}
