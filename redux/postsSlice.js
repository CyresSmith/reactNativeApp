import { createSlice } from '@reduxjs/toolkit';

export const postsInitialState = [];

const postsSlice = createSlice({
  name: 'posts',
  initialState: postsInitialState,
  reducers: {
    addPost(state, action) {
      state = state.push(action.payload);
    },

    addLikeToPost(state, action) {
      return (state = state.map(item => {
        if (item.id !== action.payload.id) {
          return item;
        }
        return { ...item, ...action.payload };
      }));
    },

    addCommentToPost(state, action) {
      return (state = state.map(item => {
        if (item.id !== action.payload.id) {
          return item;
        }

        const comments = () => {
          if (!item.comments) {
            return [action.payload.comment];
          }
          return [...item.comments, action.payload.comment];
        };

        return {
          ...item,
          comments: comments(),
        };
      }));
    },
  },
});

export const { addPost, addLikeToPost, addCommentToPost } = postsSlice.actions;
export const postsReducer = postsSlice.reducer;
