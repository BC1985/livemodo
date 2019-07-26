import React, { Component } from "react";
import "./SignupForm.css";
import Button from "../Button/Button";
import AuthApiService from "../services/auth-api-service";
import { withRouter } from "react-router-dom";

class SignupForm extends Component {
  state = {
    error: null,
    first_name: "",
    last_name: "",
    username: "",
    password: "",
    email: ""
  };

  onChange = e => {
    const name = e.target.name;
    const value = e.target.type === "radio" ? e.target.checked : e.target.value;
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
  render() {
    const spanStyle = {
      color: "whiteSmoke",
      fontStyle: "italic",
      fontSize: "0.8em"
    };

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
                type="text"
                name="first_name"
                placeholder="e.g Tommy"
                value={this.state.first_name}
                onChange={this.onChange}
                required
              />
            </div>
            <div className="text-input">
              <label>*Last Name </label>
              <input
                type="text"
                name="last_name"
                placeholder="e.g Wisseau"
                value={this.state.last_name}
                onChange={this.onChange}
                required
              />
            </div>
            <div className="text-input">
              <label>*Username </label>
              <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.onChange}
                required
              />
            </div>
            <div className="text-input">
              <label>*Email </label>
              <input
                type="text"
                name="email"
                placeholder="e.g tommy@theroom.com"
                value={this.state.email}
                onChange={this.onChange}
                required
              />
            </div>
            <div className="text-input">
              <label>*Password </label>
              <input
                type="text"
                name="password"
                value={this.state.password}
                onChange={this.onChange}
                required
              />
            </div>

            <p style={spanStyle}>* indicates required field</p>

            <Button type="submit">Submit</Button>
          </form>
          <div className="register-push" />
        </div>
      </div>
    );
  }
}

export default withRouter(SignupForm);
