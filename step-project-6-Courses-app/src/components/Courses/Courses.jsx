import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import SearchBar from '../Courses/components/SearchBar/SearchBar';
import Button from '../../common/Button/Button';
import CourseCard from './components/CourseCard/CourseCard';
import { BTN_ADD_NEW_COURSE } from '../../constants';

import { selectAllCourses } from '../../selectors';
import { selectUserRole } from '../../selectors';
import { getUserData } from '../../store/user/thunk';

import './courses.css';

function Courses() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userRole = useSelector(selectUserRole);
  const allCourses = useSelector(selectAllCourses); // take a listof the courses from the store
  const [filteredCourses, setFilteredCourses] = useState(null);

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  const getFilteredCourses = (enteredValue) => {
    if (enteredValue === '') {
      setFilteredCourses(null);
      return;
    }
    const filtered = allCourses.filter(
      (course) =>
        course.title.toLowerCase().includes(enteredValue.toLowerCase()) ||
        course.id.toLowerCase().includes(enteredValue.toLowerCase())
    );
    setFilteredCourses(filtered);
  };

  const courses = filteredCourses || allCourses;
  return (
    <section className='courses'>
      <div className='courses-head'>
        <SearchBar getFilteredCourses={getFilteredCourses} />
        {userRole === 'admin' && (
          <Button
            btnName={BTN_ADD_NEW_COURSE}
            type='button'
            onClickHandler={() => {
              navigate('/courses/add');
            }}
          />
        )}
      </div>
      {courses.map((course) => (
        <CourseCard key={course.id} {...course} />
      ))}
    </section>
  );
}

Courses.propTypes = {
  allCourses: PropTypes.arrayOf(PropTypes.object),
  courses: PropTypes.arrayOf(PropTypes.object),
  filteredCourses: PropTypes.arrayOf(PropTypes.object),
  getFilteredCourses: PropTypes.func,
  userRole: PropTypes.string,
};

export default Courses;
