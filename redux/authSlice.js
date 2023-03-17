import { createSlice } from '@reduxjs/toolkit';

export const authInitialState = {
  user: {
    avatar: null,
    login: null,
    email: null,
    password: null,
    userid: null,
    posts: [],
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

    addPost(state, action) {
      state.user.posts.push(action.payload);
    },

    togglePostLike(state, action) {
      state.user.posts = state.user.posts.map(item => {
        if (item.id !== action.payload.id) {
          return item;
        }

        const { userId } = action.payload;

        const likes = () => {
          if (!item.likes) {
            return [userId];
          }
          if (item.likes.includes(userId)) {
            return item.likes.filter(item => item !== userId);
          }
          return [...item.likes, userId];
        };

        return {
          ...item,
          likes: likes(),
        };
      });
    },

    addCommentToPost(state, action) {
      state.user.posts = state.user.posts.map(item => {
        if (item.id !== action.payload.id) {
          return item;
        }

        const { comment } = action.payload;

        const comments = () => {
          if (!item.comments) {
            return [comment];
          }
          return [...item.comments, comment];
        };

        return {
          ...item,
          comments: comments(),
        };
      });
    },
  },
});

export const {
  setAuth,
  setUser,
  setUserAvatar,
  removeAuth,
  addPost,
  togglePostLike,
  addCommentToPost,
} = userAuth.actions;
export const userAuthReducer = userAuth.reducer;
