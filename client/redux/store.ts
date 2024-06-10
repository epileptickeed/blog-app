import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice/auth';
import currentUser from './currentUserSlice/slice';
import tweetSlice from './tweetSlice/slice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    currentUser: currentUser,
    tweet: tweetSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
