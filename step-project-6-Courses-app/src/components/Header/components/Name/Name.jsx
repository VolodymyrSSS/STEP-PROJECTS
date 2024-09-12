import React from 'react';
import { useSelector } from 'react-redux';

import { selectUserName } from '../../../../selectors';

import './name.css';

function Name() {
  const userName = useSelector(selectUserName); // Take user name from the store

  return <p className='students-name'>{userName}</p>;
}

export default Name;
