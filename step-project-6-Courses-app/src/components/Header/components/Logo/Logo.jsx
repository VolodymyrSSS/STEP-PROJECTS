import React from 'react';

import logo from '../../../../assets/logo.jpg';
import './logo.css';

const Logo = () => {
  return (
    <div className='logo'>
      <img src={logo} alt='Courses logo' className='logo-image' />
      <div className='logo-title'>
        <h3 className='logo-text'>COURSES</h3>
      </div>
    </div>
  );
};

export default Logo;
