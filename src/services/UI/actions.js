export const SET_NAV_DARK = 'SET_NAV_DARK';
export const SET_NAV_LIGHT = 'SET_NAV_LIGHT';
export const SET_PANE = 'SET_PANE';

export function setNavDark() {
  return {
    type: SET_NAV_DARK,
  };
}

export function setNavLight() {
  return {
    type: SET_NAV_LIGHT,
  };
}

export function setPane(pane) {
  return {
    type: SET_PANE,
    pane,
  };
}
