import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

// The store now has redux-thunk added and the Redux DevTools Extension is turned on
const store = configureStore({
  reducer: rootReducer,
});

export default store;
