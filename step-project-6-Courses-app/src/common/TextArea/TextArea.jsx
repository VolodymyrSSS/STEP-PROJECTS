import React from 'react';
import PropTypes from 'prop-types';

import './textArea.css';

function TextArea({ labelTextArea, value, placeholder, handleTextAreaChange }) {
  return (
    <div className='textArea'>
      <label htmlFor='description'>{labelTextArea}</label>
      <textarea
        id='description'
        name='description'
        placeholder={placeholder}
        value={value}
        onChange={handleTextAreaChange}
      />
    </div>
  );
}

TextArea.propTypes = {
  labelTextArea: PropTypes.string.isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  handleTextAreaChange: PropTypes.func,
};

export default TextArea;
