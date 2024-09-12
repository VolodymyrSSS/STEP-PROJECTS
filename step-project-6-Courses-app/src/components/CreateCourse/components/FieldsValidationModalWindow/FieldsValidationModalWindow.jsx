import React, { useState } from 'react';

import './fieldsValidationModalWindow.css';

function FieldsValidationModalWindow() {
  const [validFormFields, setValidFormFields] = useState(true);

  return (
    validFormFields && (
      <div className='modal'>
        <div className='modal-body'>
          <h3 className='modal-appel'>Hey, there!</h3>
          <h2 className='modal-message'>Please, fill in all fields!!!</h2>
          <h5 className='modal-messageAdditional'>
            Notice: You don't need to add new author. But you have to add
            authors to the course.
          </h5>
          <button
            className='modal-close'
            onClick={() => setValidFormFields(!validFormFields)}
          >
            Close
          </button>
        </div>
      </div>
    )
  );
}

export default FieldsValidationModalWindow;
