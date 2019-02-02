import { SET_NAV_DARK, SET_NAV_LIGHT } from './actions';

const initialState = {
  navDark: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NAV_DARK:
      return Object.assign({}, state, { navDark: true });
    case SET_NAV_LIGHT:
      return Object.assign({}, state, { navDark: false });
    default:
      return state;
  }
};

export default reducer;
