import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { Link } from "react-router-dom";
import './Navigation.css'
import { useHistory } from "react-router-dom";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const history = useHistory()

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    history.push('/')
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      <div className="outer-button" onClick={openMenu}>
      <button  className='profile-button'>
        {user.firstName[0].toUpperCase()}
      </button>
      {showMenu === false ? (
          <i className="fa-solid fa-chevron-down"></i>
        ) : (
          <i className="fa-solid fa-chevron-up"></i>
        )}
        </div>
      <ul className={ulClassName} ref={ulRef}>
          <>
            <Link to="/profile" className="link" >
              Your events
            </Link>
            <Link to="/profile" className="link" style = {{borderBottom:"1px solid #e6dede"}}>
              Your groups
            </Link>
            <Link to="/profile" className="link">
              Your profile
            </Link>
            <li onClick={logout} className = 'link'>
              Log out
            </li>
          </>

      </ul>
    </>
  );
}

export default ProfileButton;
