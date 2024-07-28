import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
  },
  reducers: {
    loginSuccess(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
    registerSuccess(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
    }
  }
});

export const { loginSuccess, logout, registerSuccess } = authSlice.actions;

export default authSlice.reducer;
