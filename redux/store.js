import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { userAuthReducer } from './authSlice';
import { postsReducer } from './postsSlice';
import { postIdReducer } from './postIdSlise';

const rootReducer = combineReducers({
  userAuth: userAuthReducer,
  posts: postsReducer,
  postId: postIdReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
});

export default store;
