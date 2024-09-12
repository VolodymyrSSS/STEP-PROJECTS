import { IS_LOGGED_IN, IS_LOGGED_OUT, GET_USER } from './types';

export const isLoggedInUserActionCreator = (payload) => ({
  type: IS_LOGGED_IN,
  payload,
});
export const isLoggedOutUserActionCreator = () => ({
  type: IS_LOGGED_OUT,
});
export const getUserActionCreator = (payload) => ({
  type: GET_USER,
  payload,
});
