import React from 'react';
import Button from '../../../../common/Button/Button';
import {
  AUTHORS,
  BTN_ADD_AUTHOR,
  COURSE_AUTHORS,
  BTN_DELETE_AUTHOR,
} from '../../../../constants';

import './authorItem.css';

function AuthorItem({
  courseAuthors,
  listAuthors,
  deleteCourseAuthor,
  addCourseAuthor,
}) {
  const authorsInCourse = listAuthors.filter(
    (author) => courseAuthors.includes(author.id) // getting full data: id and name for each author in course
  );

  const authorsInList = listAuthors.filter(
    (author) => !courseAuthors.includes(author.id) // getting remains authors in list without those in course
  );

  return (
    <>
      <article className='author-item-container'>
        <h3 className='authors-titles'>{AUTHORS}</h3>
        {authorsInList.map((author) => {
          return (
            <div className='authors-list' key={author.id}>
              <span className='authors-existed'>{author.name}</span>
              <Button
                btnName={BTN_ADD_AUTHOR}
                type='button'
                onClickHandler={() => addCourseAuthor(author)}
              />
            </div>
          );
        })}
        <h3 className='course-authors-titles'>{COURSE_AUTHORS}</h3>
        {authorsInCourse.length ? (
          authorsInCourse.map((author) => {
            return (
              <div className='course-authors-list' key={author.id}>
                <span className='course-authors-existed'>{author.name}</span>
                <Button
                  btnName={BTN_DELETE_AUTHOR}
                  type='button'
                  onClickHandler={() => deleteCourseAuthor(author)}
                />
              </div>
            );
          })
        ) : (
          <p style={{ textAlign: 'center' }}>Author list is empty</p>
        )}
      </article>
    </>
  );
}

export default AuthorItem;
