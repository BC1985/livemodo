import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
// import LandingPage from "./LandingPage";
import "./LoginPage.css";

class LoginForm extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.history.push("/");
    this.props.changeLoginState();
  };
  render() {
    const loginButton = {
      width: "400px",
      height: "28px",
      borderRadius: "5px",
      backgroundColor: "#373f51",
      color: "whitesmoke"
    };

    return (
      <div className="login-form-container">
        <section className="login-header">
          <h1>Login to Livemodo</h1>
        </section>
        <form id="login-form" onSubmit={this.handleSubmit}>
          <label>Username</label>
          <input type="text" />
          <label>Password</label>
          <input type="text" />

          <button style={loginButton}>Log in</button>
        </form>
        <section id="help">
          <div id="forgot-password">
            <p>Forgot password? Click here</p>
          </div>
          <div id="register">
            <Link to="/register">
              <p>Don't have an account? Sign up</p>
            </Link>
          </div>
        </section>
      </div>
    );
  }
}
export default withRouter(LoginForm);
