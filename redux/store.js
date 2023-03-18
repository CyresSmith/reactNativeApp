import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { userAuthReducer } from './authSlice';
import { authReducer } from './auth';

const rootReducer = combineReducers({
  userAuth: userAuthReducer,
  auth: authReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
});

export default store;
