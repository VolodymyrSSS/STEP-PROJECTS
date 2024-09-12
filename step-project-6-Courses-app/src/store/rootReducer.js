import { combineReducers } from '@reduxjs/toolkit';
import { userReducer } from './user/reducer';
import { coursesReducer } from './courses/reducer';
import { authorsReducer } from './authors/reducer';

// combineReducers decides what the key names of the state object will be!
const rootReducer = combineReducers({
  user: userReducer,
  courses: coursesReducer,
  authors: authorsReducer,
});

export default rootReducer;
