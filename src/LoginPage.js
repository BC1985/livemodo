import React, { Component } from "react";
import { Redirect } from "react-router-dom";
// import LandingPage from "./LandingPage";
import Button from "./Button";

export default class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      Redirect: false
    };
  }
  render() {
    const handleSubmit = e => {
      e.preventDefault();
      this.setState({
        Redirect: true
      });
    };
    if (this.state.Redirect) {
      return <Redirect to="/" />;
    }
    return (
      <div className="login-form-container">
        <section className="login-header">
          <h1>Login to Livemodo</h1>
        </section>
        <form onSubmit={handleSubmit}>
          <label>Username</label>
          <input type="text" />
          <label>Password</label>
          <input type="text" />

          <Button>Log in</Button>
        </form>
        <section className="forgot-credentials">
          <p>Forgot username/ password? Click here</p>
        </section>
      </div>
    );
  }
}
