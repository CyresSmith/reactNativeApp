import { createSlice } from '@reduxjs/toolkit';

export const authInitialState = {
  displayName: null,
  email: null,
  uid: null,
  authState: null,
};

const auth = createSlice({
  name: 'auth',
  initialState: authInitialState,
  reducers: {
    updateUserProfile: (state, { payload }) => ({
      ...state,
      ...payload,
    }),

    logOutUser: state => (state = authInitialState),
  },
});

export const { updateUserProfile, logOutUser } = auth.actions;
export const authReducer = auth.reducer;
