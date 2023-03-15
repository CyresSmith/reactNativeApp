import { createSlice } from '@reduxjs/toolkit';

export const postsInitialState = [];

const postsSlice = createSlice({
  name: 'posts',
  initialState: postsInitialState,
  reducers: {
    addPost(state, action) {
      state = state.push(action.payload);
    },

    editPost(state, action) {
      return (state = state.map(item => {
        if (item.id !== action.payload.id) {
          return;
        }
        return { ...item, ...action.payload };
      }));
    },
  },
});

export const { addPost, editPost } = postsSlice.actions;
export const postsReducer = postsSlice.reducer;
