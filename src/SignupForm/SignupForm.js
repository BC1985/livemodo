import React, { Component } from "react";
import "./SignupForm.css";
import AuthApiService from "../services/auth-api-service";
import { withRouter } from "react-router-dom";
import { validateRegisration, shouldBeError } from "../Validation/validation";

class SignupForm extends Component {
  state = {
    error: null,
    first_name: "",
    last_name: "",
    username: "",
    password: "",
    email: "",
    errors: {
      first_name: false,
      last_name: false,
      username: false,
      password: false,
      email: false
    },
    touched: {
      first_name: false,
      last_name: false,
      username: false,
      password: false,
      email: false
    },
    errorMessage: false
  };

  onChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    const { first_name, last_name, email, username, password } = e.target;

    this.setState({ error: null });
    AuthApiService.postUser({
      first_name: first_name.value,
      last_name: last_name.value,
      username: username.value,
      password: password.value,
      email: email.value
    })
      .then(user => {
        first_name.value = "";
        last_name.value = "";
        username.value = "";
        password.value = "";
        email.value = "";
      })
      .catch(res => {
        this.setState({ error: res.error });
      });

    this.props.history.push("thank-you");
  };
  handleBlur = field => e => {
    this.setState({
      touched: { ...this.state.touched, [field]: true },
      ErrorMessage: true
    });
  };

  render() {
    const spanStyle = {
      color: "whiteSmoke",
      fontStyle: "italic",
      fontSize: "0.8em"
    };
    const {
      first_name,
      last_name,
      username,
      password,
      email,
      touched
    } = this.state;
    const errors = validateRegisration(
      first_name,
      last_name,
      username,
      password,
      email
    );
    const isEnabled = !Object.keys(errors).some(x => errors[x]);

    return (
      <div className="signup-container">
        <div className="call-to-action">
          <h2>Join the Livemodo community!</h2>
        </div>
        <div className="signup-form">
          <form id="signup" onSubmit={this.handleSubmit}>
            <div className="text-input">
              <label>*First Name </label>
              <input
                className={
                  shouldBeError("first_name", errors, touched) ? "error" : null
                }
                type="text"
                name="first_name"
                placeholder="e.g Tommy"
                value={first_name}
                onBlur={this.handleBlur("first_name", errors, touched)}
                onChange={this.onChange}
                required
              />
            </div>
            <div className="text-input">
              <label>*Last Name </label>
              <input
                className={
                  shouldBeError("last_name", errors, touched) ? "error" : null
                }
                type="text"
                name="last_name"
                placeholder="e.g Wisseau"
                value={last_name}
                onBlur={this.handleBlur("last_name", errors, touched)}
                onChange={this.onChange}
                required
              />
            </div>
            <div className="text-input">
              <label>*Username </label>
              <input
                className={
                  shouldBeError("username", errors, touched) ? "error" : null
                }
                type="text"
                name="username"
                value={username}
                onBlur={this.handleBlur("username", errors, touched)}
                onChange={this.onChange}
                required
              />
            </div>
            <div className="text-input">
              <label>*Email </label>
              <input
                className={
                  shouldBeError("email", errors, touched) ? "error" : null
                }
                type="text"
                name="email"
                placeholder="e.g tommy@theroom.com"
                value={email}
                onBlur={this.handleBlur("email", errors, touched)}
                onChange={this.onChange}
                required
              />
            </div>
            <div className="text-input">
              <label>*Password </label>
              <input
                className={
                  shouldBeError("password", errors, touched) ? "error" : null
                }
                type="text"
                name="password"
                value={password}
                onBlur={this.handleBlur("password", errors, touched)}
                onChange={this.onChange}
                required
              />
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
}

export default withRouter(SignupForm);
