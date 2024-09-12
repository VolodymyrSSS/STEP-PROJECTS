import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

import './app.css';

import Header from './components/Header/Header';
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import Courses from './components/Courses/Courses';
import CourseInfo from './components/CourseInfo/CourseInfo';
import CourseForm from './components/CreateCourse/CourseForm/CourseForm';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

import { getAllCourses } from './store/courses/thunk';
import { getAllAuthors } from './store/authors/thunk';

library.add(fas, faPen, faTrash);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCourses()); // send a list of courses to back-end
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllAuthors()); // send a list of authors to back-end
  }, [dispatch]);

  return (
    <BrowserRouter>
      <section className='container'>
        <Header />
        <Routes>
          <Route path='registration' element={<Registration />} />
          <Route path='courses'>
            <Route index element={<Courses />} />
            <Route path=':courseId' element={<CourseInfo />} />
          </Route>
          <Route
            path='courses/add'
            element={
              <PrivateRoute>
                <CourseForm />
              </PrivateRoute>
            }
          />
          <Route
            path='courses/update/:courseId'
            element={
              <PrivateRoute>
                <CourseForm />
              </PrivateRoute>
            }
          />
          <Route path='login' element={<Login />} />
          <Route path='*' element={<Navigate to='/login' />} />
        </Routes>
      </section>
    </BrowserRouter>
  );
}

export default App;
