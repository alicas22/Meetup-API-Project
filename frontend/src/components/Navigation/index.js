import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalButton from '../Modals/OpenModalButton';
import LoginFormModal from '../Modals/LoginFormModal';
import SignupFormModal from '../Modals/SignupFormModal';
import './Navigation.css';
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const credential = 'test'
  const password = 'password'

  const handleSubmit = (e) => {
    e.preventDefault();
   return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)

  };

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div style = {{marginRight:'15px'}}>
        <ProfileButton user={sessionUser} />
      </div>
    );
  } else {
    sessionLinks = (
      <div className='button-container'>
        <div className='demo-login' onClick = {handleSubmit}>
          Demo Log In
        </div>
        <div className='modals'>
          <OpenModalButton
            buttonText="Log In"
            modalComponent={<LoginFormModal />}
          />
        </div>
        <div className='modals'>
          <OpenModalButton
            buttonText="Sign Up"
            modalComponent={<SignupFormModal />}
          />
        </div>
      </div >
    );
  }

  return (
    <div className='header-container'>
      <div className='home-button'>
        <NavLink exact to="/" style={{textDecoration: 'none', color:'red'}}>GitTogether</NavLink>
      </div>
      <div className='login-signup'>
        {isLoaded && sessionLinks}
      </div>
    </div>
  );
}

export default Navigation;
