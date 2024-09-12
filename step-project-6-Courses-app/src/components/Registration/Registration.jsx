import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';

import {
  REGISTRATION_TITLE,
  ENTER_NAME,
  ENTER_EMAIL,
  ENTER_PASSWORD,
  BTN_REGISTRATION,
  NAME,
  EMAIL,
  PASSWORD,
} from '../../constants';
import { register } from '../../services';

import './registration.css';

function Registration() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (name && email && password) {
      const newUser = { name, email, password };
      register(newUser);
      setName('');
      setEmail('');
      setPassword('');
      navigate('/login');
    }
  };

  const getName = (enteredName) => setName(enteredName);
  const getEmail = (enteredEmail) => setEmail(enteredEmail);
  const getPassword = (enteredPassword) => setPassword(enteredPassword);

  return (
    <section className='registration-area'>
      <h2>{REGISTRATION_TITLE}</h2>
      <form className='registration-form' onSubmit={handleSubmit}>
        <Input
          labelText={NAME}
          type='text'
          placeholderText={ENTER_NAME}
          value={name}
          onChangeHandler={getName}
        />
        <Input
          labelText={EMAIL}
          type='text'
          placeholderText={ENTER_EMAIL}
          value={email}
          onChangeHandler={getEmail}
        />
        <Input
          labelText={PASSWORD}
          type='text'
          placeholderText={ENTER_PASSWORD}
          value={password}
          onChangeHandler={getPassword}
        />
        <Button type='submit' btnName={BTN_REGISTRATION} />
      </form>
      <p>
        If you have an account you can{' '}
        <span className='linking-word'>
          <Link to='/login'>Login</Link>
        </span>
      </p>
    </section>
  );
}

Registration.propTypes = {
  handleSubmit: PropTypes.func,
  getName: PropTypes.func,
  getEmail: PropTypes.func,
  getPassword: PropTypes.func,
};

export default Registration;
