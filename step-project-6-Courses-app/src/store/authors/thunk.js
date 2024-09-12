import {
  getAllAuthorsActionCreator,
  saveNewAuthorActionCreator,
} from './actions';
import { fetchAuthors, addNewAuthor } from '../../services';

// Pass this function to 'dispatch'
export const getAllAuthors = () => {
  return async function (dispatch) {
    const authors = await fetchAuthors('/authors/all'); // Make an async HTTP request
    dispatch(getAllAuthorsActionCreator(authors)); // Dispatch a real action object when the async call completes
  };
};

// Pass this function to 'dispatch'
export const saveNewAuthor = (addedAuthor) => {
  return async function (dispatch) {
    const newAuthor = await addNewAuthor(addedAuthor); // Make an async HTTP request
    dispatch(saveNewAuthorActionCreator(newAuthor)); // Dispatch a real action object when the async call completes
  };
};
