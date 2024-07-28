// action - customization reducer
export const SET_MENU = '@customization/SET_MENU';
export const MENU_TOGGLE = '@customization/MENU_TOGGLE';
export const MENU_OPEN = '@customization/MENU_OPEN';
export const SET_FONT_FAMILY = '@customization/SET_FONT_FAMILY';
export const SET_BORDER_RADIUS = '@customization/SET_BORDER_RADIUS';

// Auth
export const REGISTER = '@authReducer/REGISTER';
export const register = (isLoggedIn, accessToken) => ({
  type: REGISTER,
  payload: { isLoggedIn, accessToken }
});

// Action creator for storing user details
export const STORE_USER_DETAILS = '@authReducer/STORE_USER_DETAILS';
export const storeUserDetails = (userDetails) => ({
  type: STORE_USER_DETAILS,
  payload: userDetails
});
