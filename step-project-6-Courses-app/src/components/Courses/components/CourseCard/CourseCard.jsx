import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button from '../../../../common/Button/Button';
import { SHOW_COURSE } from '../../../../constants';
import { getCourseDuration } from '../../../../helpers/getCourseDuration';
import { formatCreationDate } from '../../../../helpers/formatCreationDate';
import { selectAuthorNamesById, selectUserRole } from '../../../../selectors';
import {
  deleteChosenCourse,
  // updateChosenCourse,
} from '../../../../store/courses/thunk';

import './courseCard.css';

function CourseCard({
  id,
  title,
  description,
  authors, // this is an array of authors' ids
  duration,
  creationDate,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const showCourseInfo = () => navigate(`/courses/${id}`);
  const userRole = useSelector(selectUserRole);

  const deleteCourse = () => {
    dispatch(deleteChosenCourse(id)); // dispatch action with middleware
  };

  const courseAuthorNames = useSelector((state) =>
    selectAuthorNamesById(state, authors)
  ).join(', ');

  return (
    <article className='course-card'>
      <div className='course-description'>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <div className='course-details'>
        <p className='long-string-names'>
          <span>Authors:</span> {courseAuthorNames}
        </p>
        <p>
          <span>Duration: </span>
          {getCourseDuration(duration)}
        </p>
        <p>
          <span>Created:</span> {formatCreationDate(creationDate)}
        </p>
        <div className='btn-row'>
          <Button
            btnName={SHOW_COURSE}
            type='button'
            onClickHandler={showCourseInfo}
          />
          {userRole === 'admin' && (
            <Button
              btnName={<FontAwesomeIcon icon='fas fa-pen' />}
              type='button'
              onClickHandler={() => {
                navigate(`/courses/update/${id}`);
              }}
            />
          )}
          {userRole === 'admin' && (
            <Button
              btnName={<FontAwesomeIcon icon='fas fa-trash' />}
              type='button'
              onClickHandler={deleteCourse}
            />
          )}
        </div>
      </div>
    </article>
  );
}

CourseCard.propTypes = {
  showCourseInfo: PropTypes.func,
};

export default CourseCard;
