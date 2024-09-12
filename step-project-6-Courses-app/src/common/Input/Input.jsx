import React from 'react';
import PropTypes from 'prop-types';

import './input.css';

function Input({ labelText, type, placeholderText, value, onChangeHandler }) {
  return (
    <div className='input-block'>
      <label htmlFor='input-label'>{labelText}</label>
      <input
        className='input-field'
        placeholder={placeholderText}
        type={type}
        value={value}
        onChange={(event) => onChangeHandler(event.target.value)}
      />
    </div>
  );
}

Input.propTypes = {
  labelText: PropTypes.string,
  type: PropTypes.string.isRequired,
  placeholderText: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChangeHandler: PropTypes.func,
};

export default Input;
