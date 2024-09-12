import {
  getAllCoursesActionCreator,
  saveNewCourseActionCreator,
  updateCourseActionCreator,
  deleteCourseActionCreator,
} from './actions';
import {
  fetchCourses,
  addNewCourse,
  updateOneCourse,
  deleteOneCourse,
} from '../../services';

// Pass this function to 'dispatch'
export const getAllCourses = () => {
  return async function (dispatch) {
    const courses = await fetchCourses('/courses/all'); // Make an async HTTP request
    dispatch(getAllCoursesActionCreator(courses)); // Dispatch a real action object when the async call completes
  };
};

// Pass this function to 'dispatch'
export const saveNewCourse = (addedCourse) => {
  return async function (dispatch) {
    const newCourse = await addNewCourse(addedCourse); // Make an async HTTP request
    dispatch(saveNewCourseActionCreator(newCourse)); // Dispatch a real action object when the async call completes
  };
};

// Pass this function to 'dispatch'
export const updateChosenCourse = (id, updatedCourseData) => {
  return async function (dispatch) {
    const courseToBeUpdated = await updateOneCourse(id, updatedCourseData); // Make an async HTTP request
    dispatch(updateCourseActionCreator(courseToBeUpdated)); // Dispatch a real action object when the async call completes
  };
};

// Pass this function to 'dispatch'
export const deleteChosenCourse = (id) => {
  return async function (dispatch) {
    const courseToBeDeleted = await deleteOneCourse(id); // Make an async HTTP request
    if (courseToBeDeleted) {
      dispatch(deleteCourseActionCreator(id)); // Dispatch a real action object when the async call completes
    }
  };
};
