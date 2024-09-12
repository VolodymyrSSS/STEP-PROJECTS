import { SAVE_NEW_AUTHOR, GET_ALL_AUTHORS } from './types';

export const getAllAuthorsActionCreator = (payload) => ({
  type: GET_ALL_AUTHORS,
  payload,
});

export const saveNewAuthorActionCreator = (payload) => ({
  type: SAVE_NEW_AUTHOR,
  payload,
});
