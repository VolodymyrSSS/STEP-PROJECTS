export const selectUserStatus = (state) => state.user.isAuth;
export const selectUserName = (state) => state.user.name;
export const selectUserRole = (state) => state.user.role;

export const selectAllCourses = (state) => state.courses;
export const selectCourseById = (state, courseId) => {
  return state.courses.find((course) => course.id === courseId);
};

export const selectAllAuthors = (state) => state.authors;
export const selectAuthorNamesById = (state, authorIds) => {
  return authorIds.map((authorId) => {
    return state.authors.find((author) => author.id === authorId)?.name;
  });
};
