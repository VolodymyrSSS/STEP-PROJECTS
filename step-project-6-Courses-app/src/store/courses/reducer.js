import * as actions from './types';

const coursesInitialState = [];

export const coursesReducer = (state = coursesInitialState, action) => {
  switch (action.type) {
    case actions.GET_ALL_COURSES:
      return action.payload;
    case actions.SAVE_NEW_COURSE:
      return [
        ...state,
        {
          title: action.payload.title,
          description: action.payload.description,
          creationDate: action.payload.creationDate,
          duration: action.payload.duration,
          authors: action.payload.authors,
          id: action.payload.id,
        },
      ];
    case actions.UPDATE_COURSE:
      return state.map((course) =>
        course.id !== action.payload
          ? course
          : [
              ...state,
              {
                title: action.payload.title,
                description: action.payload.description,
                creationDate: action.payload.creationDate,
                duration: action.payload.duration,
                authors: action.payload.authors,
                id: action.payload.id,
              },
            ]
      );
    case actions.DELETE_COURSE:
      return state.filter((course) => course.id !== action.payload);
    default:
      return state;
  }
};
