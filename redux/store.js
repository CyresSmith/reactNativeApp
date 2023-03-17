import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { userAuthReducer } from './authSlice';

const rootReducer = combineReducers({
  userAuth: userAuthReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
});

export default store;
