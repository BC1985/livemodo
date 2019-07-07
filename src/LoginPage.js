import React, { Component } from "react";
// import { Redirect } from "react-router-dom";
// import LandingPage from "./LandingPage";
import Button from "./Button";
import "./LoginPage.css";

export default class LoginForm extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.history.push("/");
    this.props.changeLoginState();
  };
  render() {
    // if (this.state.Redirect) {
    //   return <Redirect to="/thank-you" />;
    // }
    return (
      <div className="login-form-container">
        <section className="login-header">
          <h1>Login to Livemodo</h1>
        </section>
        <form onSubmit={this.handleSubmit}>
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
