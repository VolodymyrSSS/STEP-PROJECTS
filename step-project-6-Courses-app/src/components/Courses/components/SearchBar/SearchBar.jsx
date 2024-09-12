import React from 'react';

import Button from '../../../../common/Button/Button';
import Input from '../../../../common/Input/Input';
import {
  PLACEHOLDER_SEARCH_TEXT,
  BTN_NAME_SEARCH,
} from '../../../../constants';

import './searchBar.css';

function SearchBar({ getFilteredCourses }) {
  let value = '';
  return (
    <div className='courses-search'>
      <Input
        className='input-field'
        placeholderText={PLACEHOLDER_SEARCH_TEXT}
        type='text'
        onChangeHandler={(enteredValue) => {
          if (enteredValue === '') getFilteredCourses(enteredValue);
          value = enteredValue;
        }}
      />
      <Button
        btnName={BTN_NAME_SEARCH}
        type='button'
        onClickHandler={() => getFilteredCourses(value)}
      />
    </div>
  );
}

export default SearchBar;
