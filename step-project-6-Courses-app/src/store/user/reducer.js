import { IS_LOGGED_IN, IS_LOGGED_OUT, GET_USER } from './types';

const userInitialState = {
  isAuth: false,
  name: '',
  email: '',
  token: '',
  role: '',
};

export const userReducer = (state = userInitialState, action) => {
  switch (action.type) {
    case IS_LOGGED_IN: {
      return {
        ...state.user,
        isAuth: true,
        name: action.payload.user.name,
        email: action.payload.user.email,
        token: action.payload.result,
      };
    }
    case GET_USER: {
      return {
        ...state,
        isAuth: true,
        name: action.payload.name,
        email: action.payload.email,
        token: action.payload.result,
        role: action.payload.role,
      };
    }
    case IS_LOGGED_OUT: {
      return {
        ...state.user,
        isAuth: false,
        name: '',
        email: '',
        token: '',
        role: '',
      };
    }
    default:
      return state;
  }
};
