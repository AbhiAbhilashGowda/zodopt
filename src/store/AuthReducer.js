import { REGISTER, STORE_USER_DETAILS } from './actions';

const initialState = {
  isLoggedIn: false,
  accessToken: '',
  userDetails: {} // Add userDetails to initial state
};

// ==============================|| AUTH REDUCER ||============================== //

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER:
      return {
        ...state,
        isLoggedIn: action.payload.isLoggedIn,
        accessToken: action.payload.accessToken,
      };

    case STORE_USER_DETAILS:
      return {
        ...state,
        userDetails: action.payload.userDetails
      };

    default:
      return state;
  }
};

export default authReducer;
