import { GET_ALL_AUTHORS, SAVE_NEW_AUTHOR } from './types';

const authorsInitialState = [];

export const authorsReducer = (state = authorsInitialState, action) => {
  switch (action.type) {
    case GET_ALL_AUTHORS:
      return action.payload;
    case SAVE_NEW_AUTHOR:
      return [
        ...state,
        {
          id: action.payload.id,
          name: action.payload.name,
        },
      ];
    default:
      return state;
  }
};
