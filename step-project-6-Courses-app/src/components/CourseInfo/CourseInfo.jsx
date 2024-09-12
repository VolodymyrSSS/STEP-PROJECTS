import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { getCourseDuration } from '../../helpers/getCourseDuration';
import { formatCreationDate } from '../../helpers/formatCreationDate';
import { selectAuthorNamesById, selectAllCourses } from '../../selectors';

import './courseInfo.css';

function CourseInfo() {
  const { courseId } = useParams();
  const allCourses = useSelector(selectAllCourses);
  const courseInfo = allCourses.find((course) => course.id === courseId);

  const courseAuthorNames = useSelector((state) =>
    selectAuthorNamesById(state, courseInfo.authors)
  ).join(', ');

  return (
    <section className='course-info'>
      <div className='course-info-header'>
        <Link to='/courses' className='linking-toCourses'>
          &laquo; Back to courses
        </Link>
        <h1 style={{ textAlign: 'center' }}>{courseInfo.title}</h1>
      </div>
      <div className='course-info-main'>
        <div className='description'>{courseInfo.description}</div>
        <div className='complementary-courseInfo'>
          <div className='complementary-courseInfo-id'>
            <h3>ID:</h3>
            <span>{courseInfo.id}</span>
          </div>
          <div className='complementary-courseInfo-duration'>
            <h3>Duration:</h3>
            <span>{getCourseDuration(courseInfo.duration)}</span>
          </div>
          <div className='complementary-courseInfo-created'>
            <h3>Created:</h3>
            <span>{formatCreationDate(courseInfo.creationDate)}</span>
          </div>
          <div className='complementary-courseInfo-authors'>
            <h3>Authors:</h3>
            <span className='authors-names'>{courseAuthorNames}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

CourseInfo.propTypes = {
  courseInfo: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
  ]),
};

export default CourseInfo;
