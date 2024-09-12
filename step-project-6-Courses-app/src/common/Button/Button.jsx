import React from 'react';
import PropTypes from 'prop-types';

import './button.css';

function Button({ type, btnName, onClickHandler }) {
  return (
    <button className='btn' type={type} onClick={onClickHandler}>
      {btnName}
    </button>
  );
}

Button.propTypes = {
  type: PropTypes.oneOf(['button', 'submit']),
  btnName: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onClickHandler: PropTypes.func,
};

export default Button;
