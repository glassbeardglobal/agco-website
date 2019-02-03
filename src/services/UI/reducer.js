import { SET_NAV_DARK, SET_NAV_LIGHT, SET_PANE } from './actions';

const initialState = {
  navDark: false,
  pane: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NAV_DARK:
      return Object.assign({}, state, { navDark: true });
    case SET_NAV_LIGHT:
      return Object.assign({}, state, { navDark: false });
    case SET_PANE:
      return Object.assign({}, state, { pane: action.pane });
    default:
      return state;
  }
};

export default reducer;
