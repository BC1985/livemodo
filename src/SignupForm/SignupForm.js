import React, { Component } from "react";
import "./SignupForm.css";
import AuthApiService from "../services/auth-api-service";
import { withRouter } from "react-router-dom";
import { validateRegisration, shouldBeError } from "../Validation/validation";


import { useState } from "react";

function SignupForm(props) {
  const [input, setInput] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
  });
  const { email, password, first_name, last_name, username } = input;
  const [touched, setTouched] = useState({
    first_name: false,
    last_name: false,
    username: false,
    email: false,
    password: false,
  });
  const [errors, setErrors] = useState({
    first_name: false,
    last_name: false,
    username: false,
    email: false,
    password: false,
  });
  const [passwordError, setPasswordError] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [error, setError] = useState("")
  // state = {
  //   error: null,


  //   errorMessage: false,
  //   passwordError: false
  // };

  const onChange = e => {
    const { name, value } = e.target;
    setInput(input => ({ ...input, [name]: value }));
  };

  const validatePassword = () => {
    
    const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[\S]+/;
    if (password.length < 8) {
      return "Password must be at least 8 characters";
    }
    if (password.length > 72) {
      return "Password must be less than 72 characters";
    }
    if (password.startsWith(" ") || password.endsWith(" ")) {
      return "Password must not start or end with empty spaces";
    }
    if (!REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(password)) {
      return "Password must contain at least one upper case, lower case, number and special character";
    }
    return null;
  };

  const renderError = e => {
    setPasswordError(true)
  };

  const handleSubmit = e => {
    e.preventDefault();
    const passwordNotValid = validatePassword();

    if (passwordNotValid) {
      // this.setState({ error: true }, renderError());
      setHasError(true)
      renderError()
    } else {
      // const { first_name, last_name, email, username, password } = e.target;
      AuthApiService.postUser({
        first_name,
        last_name,
        username,
        password,
        email
      })
        .then(user => {
          first_name.value = "";
          last_name.value = "";
          username.value = "";
          password.value = "";
          email.value = "";
        })
        .catch(console.log(res));

      props.history.push("thank-you");
    }
  };
  const handleBlur = field => e => {
    setTouched({ ...touched, [field]: true });
  };

  const spanStyle = {
    color: "whiteSmoke",
    fontStyle: "italic",
    fontSize: "0.8em",
  };
  const ifPasswordError = {
    border: "2px solid red",
  };

  const validationErrors = validateRegisration(
    first_name,
    last_name,
    username,
    password,
    email
  );
  const isEnabled = !Object.keys(validationErrors).some(x => errors[x]);
  
  const errorMessage = validatePassword();
  return (
    <div className="signup-container">
      <div className="call-to-action">
        <h2>Join the Livemodo community!</h2>
      </div>
      <div className="signup-form">
        <form id="signup" onSubmit={handleSubmit}>
          <div className="text-input">
            <label>*First Name </label>
            <input
              className={
                shouldBeError("first_name", validationErrors, touched) ? "error" : null
              }
              type="text"
              name="first_name"
              placeholder="e.g Tommy"
              value={first_name}
              onBlur={handleBlur("first_name", validationErrors, touched)}
              onChange={onChange}
              required
            />
          </div>
          <div className="text-input">
            <label>*Last Name </label>
            <input
              className={
                shouldBeError("last_name", validationErrors, touched) ? "error" : null
              }
              type="text"
              name="last_name"
              placeholder="e.g Wisseau"
              value={last_name}
              onBlur={handleBlur("last_name", validationErrors, touched)}
              onChange={onChange}
              required
            />
          </div>
          <div className="text-input">
            <label>*Username </label>
            <input
              className={
                shouldBeError("username", validationErrors, touched) ? "error" : null
              }
              type="text"
              name="username"
              value={username}
              onBlur={handleBlur("username", validationErrors, touched)}
              onChange={onChange}
              required
            />
          </div>
          <div className="text-input">
            <label>*Email </label>
            <input
              className={
                shouldBeError("email", validationErrors, touched) ? "error" : null
              }
              type="text"
              name="email"
              placeholder="e.g tommy@theroom.com"
              value={email}
              onBlur={handleBlur("email", validationErrors, touched)}
              onChange={onChange}
              required
            />
          </div>
          <div className="text-input">
            <label>*Password </label>
            <input
              className={
                shouldBeError("password", validationErrors, touched) ? "error" : null
              }
              type="text"
              name="password"
              value={password}
              onBlur={handleBlur("password", validationErrors, touched)}
              onChange={onChange}
              required
              style={passwordError ? ifPasswordError : null}
            />
            <span className="errorMessage">
              {error ? errorMessage : ""}
            </span>
          </div>

          <p style={spanStyle}>* indicates required field</p>
          <button
            id="register-button"
            type={!isEnabled ? "disabled" : "submit"}
            disabled={!isEnabled}
          >
            Submit
          </button>
        </form>
        <div className="register-push" />
      </div>
    </div>
  );
}

export default withRouter(SignupForm);
