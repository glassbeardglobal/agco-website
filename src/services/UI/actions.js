export const SET_NAV_DARK = 'SET_NAV_DARK';
export const SET_NAV_LIGHT = 'SET_NAV_LIGHT';

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
