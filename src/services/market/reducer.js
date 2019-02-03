import {
  SEARCH,
  ADD_FILTER,
  REMOVE_FILTER,
} from './actions';

const initialState = {
  searchQuery: 'Search',
  searchDirty: false,
  filters: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH:
      return Object.assign({}, state, { searchDirty: action.setDirty, searchQuery: action.query });
    case ADD_FILTER:
      return Object.assign({}, state, { filters: [ ...state.filters, action.filter ]})
    case REMOVE_FILTER:
      return Object.assign({}, state, { filters: [ ...state.filters ].filter(el => el !== action.filter) })    
    default:
      return state;
  }
};

export default reducer;
