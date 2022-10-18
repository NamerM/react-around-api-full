import React, { useState} from 'react';
import { Link } from "react-router-dom";

const Register = ({ onRegisterUser }) => {  //property name used on return
  const [email, setEmail] = useState('');
  const [password , setPassword] = useState('');
  //const [confirmPassword, setConfirmPassword] = useState('');
   function handleSubmit(e) {
    e.preventDefault();
    // if(password === confirmPassword){
    const userData = {
      email,
      password,
      //confirmPassword,
    }
    onRegisterUser(userData);  //app.js function name
  }
  //}
  function handleEmailChange(e) {
    setEmail(e.target.value);
  }
  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }
  // function handleConfirmPasswordChange(e) { setConfirmPassword(e.target.value)}
	return (
    <div className="sign-form">
      <form className="sign-form__field" onSubmit={handleSubmit}>
        <div className="sign-form__area">
          <h3 className="sign-form__title">Sign Up</h3>
          <label className="sign-form__input">
            <input className="sign-form__input_text"
              value={email}
              name="email"
              type="text"
              placeholder="Email"
              onChange={handleEmailChange} required />
          </label>
          <label className="sign-form__input">
            <input
              className="sign-form__input_text"
              value={password}
              name="password"
              type="password"
              placeholder="Password"
              onChange={handlePasswordChange}  required/>
          </label>
          {/* <label className="sign-form__input">
            <input
              className="sign-form__input_text"
              value={confirmPassword}
              name="confirmPassword"
              type="password"
              placeholder="Password"
              onChange={handleConfirmPasswordChange}  required/>
          </label> */}
        </div>
        <div className="sign-form__area">
          <button className="sign-form__button" type="submit">
            Sign Up
          </button>
          <p className="sign-form__text">
            Already a member? {' '}
            <Link className="sign-form__link" to="/signin">
              Log in here!
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Register;
