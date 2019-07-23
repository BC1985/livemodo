import React, { Component } from "react";
import "./SignupForm.css";
import Button from "../Button/Button";
import AuthApiService from "../services/auth-api-service";

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

    this.props.changeState();
  };
  render() {
    const spanStyle = {
      color: "whiteSmoke",
      fontStyle: "italic",
      fontSize: "12px"
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

            <p style={spanStyle}>(* indicates required field)</p>
            <p>
              Pick the option that best describes your concergoing habits{" "}
              <span style={spanStyle}>(optional)</span>
            </p>
            <div className="form-buttons">
              <div>
                <input
                  type="radio"
                  value="homebody"
                  name="button"
                  onChange={this.onChange}
                />
                Homebody
              </div>
              <div>
                <input
                  type="radio"
                  value="Occasiona concertgoer"
                  name="button"
                  onChange={this.onChange}
                />
                Occasional concertgoer
              </div>
              <div>
                <input
                  type="radio"
                  name="button"
                  value="Concert Connuiseur"
                  onChange={this.onChange}
                />
                Concert Connuiseur
              </div>

              <Button type="submit">Submit</Button>
            </div>
          </form>
          <div className="register-push" />
        </div>
      </div>
    );
  }
}

export default SignupForm;
