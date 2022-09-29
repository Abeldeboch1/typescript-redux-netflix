import { configureStore } from '@reduxjs/toolkit';
import netflixReducer from './netflixSlice';

const store = configureStore({
  reducer: {
    netflix: netflixReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;