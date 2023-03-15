import { createSlice } from '@reduxjs/toolkit';

export const commentsIdInitialState = null;

const postIdSlice = createSlice({
  name: 'postId',
  initialState: commentsIdInitialState,
  reducers: {
    setPostId(state, action) {
      return action.payload;
    },

    removePostId(state, action) {
      return commentsIdInitialState;
    },
  },
});

export const { setPostId, removePostId } = postIdSlice.actions;
export const postIdReducer = postIdSlice.reducer;
