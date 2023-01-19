// frontend/src/components/LoginFormModal/index.js
import React, { useState } from "react";
import * as sessionActions from "../../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import "./LoginForm.css";
import OpenModalButton from '../OpenModalButton';
import SignupFormModal from '../SignupFormModal';
import OpenLoginModal from "../OpenLoginModal";



function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(
        async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        }
      );
  };

  return (
    <div className="login-container">
      <img
          className="login-form-icon"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLxuHMX3PPsXyTanvhUj2POWJLhON6SfVd3lJNxfcyQsV03uSSXhKx97JonQ5-znzut2s&usqp=CAU"
          alt="logo"
        />
      <h1>Log In</h1>
      <form className='login-form' onSubmit={handleSubmit}>
        <ul className="validation-errors">
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>

        <div className="login-form-signup">
          <span>
            Not a member yet?</span>
            <OpenLoginModal className = "login-form-signup-link"
            buttonText="Sign Up"
            modalComponent={<SignupFormModal />}

            />
        </div>
            <br />
        <label>
          Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>

        <div>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit" className="login-form-button" >Log In</button>
      </form>
    </div>
  );
}

export default LoginFormModal;
