import { createSlice } from '@reduxjs/toolkit';

export const authInitialState = {
  user: {
    avatar: null,
    login: null,
    email: null,
    password: null,
  },
  auth: false,
};

const userAuth = createSlice({
  name: 'userAuth',
  initialState: authInitialState,
  reducers: {
    setAuth(state, action) {
      state.auth = action.payload;
    },

    setUser(state, action) {
      state.user = { ...state.user, ...action.payload };
    },

    removeAuth(state, action) {
      state.user = action.payload;
      state.auth = false;
    },
  },
});

export const { setAuth, setUser, setUserAvatar, removeAuth } = userAuth.actions;
export const userAuthReducer = userAuth.reducer;
