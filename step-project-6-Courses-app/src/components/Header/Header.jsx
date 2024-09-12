import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { TITLE_LOGOUT } from '../../constants';
import Logo from './components/Logo/Logo';
import Name from './components/Name/Name';
import Button from '../../common/Button/Button';

import { selectUserStatus } from '../../selectors';
import { logoutUser } from '../../store/user/thunk';

import './header.css';

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userStatus = useSelector(selectUserStatus); // Take 'isAuth'-property of the user from the store

  const logout = () => {
    dispatch(logoutUser()); // dispatch action with middleware to the back-end
    localStorage.clear(); // Delete token from the localStorage after logout
    navigate('/login');
  };

  return (
    <header className='page-header'>
      <Logo />
      {userStatus && (
        <div className='controled-user'>
          <Name />
          <Button
            btnName={TITLE_LOGOUT}
            type='button'
            onClickHandler={logout}
          />
        </div>
      )}
    </header>
  );
}

Header.propTypes = {
  logout: PropTypes.func,
};

export default Header;
