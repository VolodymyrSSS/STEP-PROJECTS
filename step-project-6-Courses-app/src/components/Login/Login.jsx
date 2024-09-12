import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';

import {
  LOGIN_TITLE,
  ENTER_EMAIL,
  ENTER_PASSWORD,
  BTN_LOGIN,
  EMAIL,
  PASSWORD,
} from '../../constants';
import { login } from '../../services';
import { isLoggedInUserActionCreator } from '../../store/user/actions';

import './login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const getEmail = (enteredEmail) => setEmail(enteredEmail);
  const getPassword = (enteredPassword) => setPassword(enteredPassword);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (email && password) {
      const registeredUser = { email, password };
      const userData = await login(registeredUser);
      dispatch(isLoggedInUserActionCreator(userData)); // Save information (name, token, email) from response to the store
      // 'userData' from the localStorage get earlier than from the store
      let getSuccessToken = () => {
        return JSON.parse(localStorage.getItem('token'));
      };
      if (getSuccessToken) {
        navigate('/courses');
      } else {
        alert('The password or the email is wrong!');
      }
    }
  };

  return (
    <section className='login-area'>
      <h2>{LOGIN_TITLE}</h2>
      <form className='login-form' onSubmit={handleSubmit}>
        <Input
          labelText={EMAIL}
          type='email'
          placeholderText={ENTER_EMAIL}
          value={email}
          onChangeHandler={getEmail}
        />
        <Input
          labelText={PASSWORD}
          type='password'
          placeholderText={ENTER_PASSWORD}
          value={password}
          onChangeHandler={getPassword}
        />
        <Button type='submit' btnName={BTN_LOGIN} />
      </form>
      <p>
        If you not have an account you can{' '}
        <span className='linking-word'>
          <Link to='/registration'>Registration</Link>
        </span>
      </p>
    </section>
  );
}

Login.propTypes = {
  handleSubmit: PropTypes.func,
  getEmail: PropTypes.func,
  getPassword: PropTypes.func,
};

export default Login;
