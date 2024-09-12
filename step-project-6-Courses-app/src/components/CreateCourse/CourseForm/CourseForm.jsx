import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import Input from '../../../common/Input/Input';
import Button from '../../../common/Button/Button';
import TextArea from '../../../common/TextArea/TextArea';
import AuthorItem from '../components/AuthorItem/AuthorItem';
import FieldsValidationModalWindow from '../components/FieldsValidationModalWindow/FieldsValidationModalWindow';

import {
  TITLE,
  PLACEHOLDER_ENTER_TITLE,
  BTN_CREATE_COURSE,
  BTN_UPDATE_COURSE,
  DESCRIPTION_TITLE,
  ENTER_DESCRIPTION,
  ADD_AUTHOR,
  AUTHOR_NAME,
  ENTER_AUTHOR_NAME,
  CREATE_AUTHOR,
  ADD_DURATION,
  ENTER_DURATION,
  DURATION_LABEL,
} from '../../../constants';
import { getCourseDuration } from '../../../helpers/getCourseDuration';
import {
  saveNewCourse,
  updateChosenCourse,
} from '../../../store/courses/thunk';
// import { saveNewAuthorActionCreator } from '../../../store/authors/actions';
import { saveNewAuthor } from '../../../store/authors/thunk';
import {
  selectAllCourses,
  selectAllAuthors,
  selectCourseById,
} from '../../../selectors';

import './courseForm.css';
import { useEffect } from 'react';

function CreateCourse() {
  const allCourses = useSelector(selectAllCourses);
  const allAuthors = useSelector(selectAllAuthors);
  const [listCourses, setListCourses] = useState(allCourses);
  const [listAuthors, setListAuthors] = useState(allAuthors);

  const [courseName, setCourseName] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [courseDuration, setCourseDuration] = useState('');
  const [courseAuthors, setCourseAuthors] = useState([]);
  const [newAuthorName, setNewAuthorName] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const addCourseName = (value) => {
    if (value.trim()) {
      setCourseName(value);
    }
  };

  const addCourseDescription = (event) => {
    event.preventDefault();
    setCourseDescription(event.target.value);
  };

  const addNewAuthorName = () => {
    // id would be generated from the back-end automaticaly
    const newName = { name: newAuthorName };
    dispatch(saveNewAuthor(newName)); // the new author should be saved to the back-end
    setListAuthors((authorNames) => [...authorNames, newName]);
    setNewAuthorName('');
  };

  const addDuration = (value) => {
    setCourseDuration(+value);
  };

  const addCourseAuthor = (author) => {
    setCourseAuthors((courseAuthors) => [...courseAuthors, author.id]);
    setListAuthors((listAuthors) =>
      listAuthors.filter((authorId) => authorId !== author.id)
    );
  };

  const deleteCourseAuthor = (author) => {
    setCourseAuthors((courseAuthors) =>
      courseAuthors.filter((courseAuthorId) => courseAuthorId !== author.id)
    );
    setListAuthors((listAuthors) => [...listAuthors, author]);
  };

  const { courseId } = useParams();
  let isUpdateCourse = false;
  let courseById = useSelector((state) => selectCourseById(state, courseId));
  let courseForUpdate;

  if (courseId) {
    isUpdateCourse = true;

    courseForUpdate = {
      title: courseById.title,
      creationDate: courseById.creationDate,
      description: courseById.description,
      duration: courseById.duration,
      authors: courseById.authors,
    };
  }

  useEffect(() => {
    if (isUpdateCourse) {
      setCourseName(courseForUpdate.title);
      setCourseDescription(courseForUpdate.description);
      setCourseDuration(courseForUpdate.duration);
      setCourseAuthors(courseForUpdate.authors);
    }
  }, [isUpdateCourse]);

  const updateCourse = (event) => {
    event.preventDefault(); // prevent to reload the page and send the request to a server
    if (
      !courseName ||
      courseDescription.length <= 2 ||
      !courseDuration ||
      !courseAuthors
    ) {
      setIsModalOpen(!isModalOpen);
      return;
    }

    const updatedCourseData = {
      title: courseName,
      description: courseDescription,
      duration: courseDuration,
      authors: courseAuthors,
    };

    dispatch(updateChosenCourse(courseId, updatedCourseData)); // dispatch updated course to back-end

    setListCourses((courses) => [...courses, updatedCourseData]);
    setCourseName('');
    setCourseDescription('');
    setCourseDuration('');
    navigate('/courses');
    alert(
      `One course was updated. So far, you have ${listCourses.length} {${
        listCourses.length === 1 ? 'course' : 'courses'
      }} in a list.`
    );
  };

  const addNewCourse = (event) => {
    event.preventDefault(); // prevent to reload the page and send the request to a server
    if (
      !courseName ||
      courseDescription.length <= 2 ||
      !courseDuration ||
      !courseAuthors
    ) {
      setIsModalOpen(!isModalOpen);
      return;
    }

    const addedCourse = {
      // id and creation date would be generated from the back-end automaticaly
      title: courseName,
      description: courseDescription,
      duration: courseDuration,
      authors: courseAuthors,
    };

    dispatch(saveNewCourse(addedCourse)); // dispatch addedCourse to back-end

    setListCourses((courses) => [...courses, addedCourse]);
    setCourseName('');
    setCourseDescription('');
    setCourseDuration('');
    navigate('/courses');
    alert(
      `One course will be added. You will have totaly ${
        listCourses.length + 1
      } courses in a list.`
    );
  };

  // const authorsInCourse = listAuthors.filter(
  //   (author) => courseAuthors.includes(author.id) // getting full data: id and name for each author in course
  // );

  // const authorsInList = listAuthors.filter(
  //   (author) => !courseAuthors.includes(author.id) // getting remains authors in list without those in course
  // );

  return (
    <section className='add-course'>
      {isModalOpen && <FieldsValidationModalWindow />}
      <form
        className='add-title-and-textarea'
        onSubmit={isUpdateCourse ? updateCourse : addNewCourse}
      >
        <div className='create-title'>
          <Input
            labelText={TITLE}
            type='text'
            placeholderText={PLACEHOLDER_ENTER_TITLE}
            value={courseName}
            onChangeHandler={addCourseName}
          />
          <Button
            btnName={isUpdateCourse ? BTN_UPDATE_COURSE : BTN_CREATE_COURSE}
            type='submit'
          />
        </div>
        <TextArea
          labelTextArea={DESCRIPTION_TITLE}
          placeholder={ENTER_DESCRIPTION}
          value={courseDescription}
          handleTextAreaChange={addCourseDescription}
        />

        <article className='add-authors-and-duration'>
          <div className='author-duration-container'>
            <h3 className='authorName'>{ADD_AUTHOR}</h3>
            <Input
              placeholderText={ENTER_AUTHOR_NAME}
              labelText={AUTHOR_NAME}
              type='text'
              value={newAuthorName}
              onChangeHandler={setNewAuthorName}
            />
            <Button
              btnName={CREATE_AUTHOR}
              type='button'
              onClickHandler={addNewAuthorName}
            />
            <h3 className='durationName'>{ADD_DURATION}</h3>
            <Input
              labelText={DURATION_LABEL}
              placeholderText={ENTER_DURATION}
              type='number'
              value={courseDuration.toString()}
              onChangeHandler={addDuration}
            />
            <div className='duration-formated'>
              <span>Duration: {getCourseDuration(courseDuration)}</span>
            </div>
          </div>
          <AuthorItem
            courseAuthors={courseAuthors}
            listAuthors={listAuthors}
            deleteCourseAuthor={deleteCourseAuthor}
            addCourseAuthor={addCourseAuthor}
          />
        </article>
      </form>
    </section>
  );
}

CreateCourse.propTypes = {
  allAuthors: PropTypes.arrayOf(PropTypes.object),
  courseAuthors: PropTypes.arrayOf(PropTypes.string),
  listCourses: PropTypes.arrayOf(PropTypes.object),
  listAuthors: PropTypes.arrayOf(PropTypes.object),
  addCourseName: PropTypes.func,
  addCourseDescription: PropTypes.func,
  addAuthorIds: PropTypes.func,
  addNewAuthorName: PropTypes.func,
  addDuration: PropTypes.func,
  courseDuration: PropTypes.number,
  deleteCourseAuthor: PropTypes.func,
  addCourseAuthor: PropTypes.func,
  addNewCourse: PropTypes.func,
  updateCourse: PropTypes.func,
};

export default CreateCourse;
