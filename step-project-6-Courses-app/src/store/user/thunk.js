import { getUserActionCreator, isLoggedOutUserActionCreator } from './actions';
import { getUser, logout } from '../../services';

// Pass this function to 'dispatch'
export const getUserData = () => {
  return async function (dispatch) {
    const user = await getUser('/users/me'); // Make an async HTTP request
    dispatch(getUserActionCreator(user)); // Dispatch a real action object when the async call completes
  };
};

// Pass this function to 'dispatch'
export const logoutUser = () => {
  return async function (dispatch) {
    const isUserOutlogged = await logout('/logout'); // Make an async HTTP request
    if (isUserOutlogged) {
      dispatch(isLoggedOutUserActionCreator(isUserOutlogged)); // Dispatch a real action object when the async call completes
    }
  };
};
