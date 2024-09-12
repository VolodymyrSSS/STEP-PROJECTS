// import {
//   GET_ALL_COURSES,
//   SAVE_NEW_COURSE,
//   UPDATE_COURSE,
//   DELETE_COURSE,
// } from './types';

import * as actions from './types';

export const saveNewCourseActionCreator = (payload) => ({
  type: actions.SAVE_NEW_COURSE,
  payload,
});

export const deleteCourseActionCreator = (payload) => ({
  type: actions.DELETE_COURSE,
  payload,
});

export const updateCourseActionCreator = (payload) => ({
  type: actions.UPDATE_COURSE,
  payload,
});

export const getAllCoursesActionCreator = (payload) => ({
  type: actions.GET_ALL_COURSES,
  payload,
});
