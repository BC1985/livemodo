import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
// import LandingPage from "./LandingPage";
import "./LoginPage.css";
import { TokenService } from "./utils/token-service";
import config from "./config";

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      error: false
    };
  }

  handeSubmitJwtAuth = e => {
    e.preventDefault();
    const { username, password } = e.target;
    TokenService.saveAuthToken(
      TokenService.makeBasicAuthToken(username.value, password.value)
    );
    this.postLogin({
      username: username.value,
      password: password.value
    })
      .then(res => {
        username.value = "";
        password.value = "";
        TokenService.saveAuthToken(res.authToken);
      })
      .catch(res => {
        this.setState({ error: true });
      });
  };
  postLogin(credentials) {
    return fetch(`${config.API_ENDPOINT}/auth/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(credentials)
    }).then(res => {
      if (!res.ok) {
        this.setState({
          error: true
        });
        // res.json().then(e => Promise.reject(e));
      } else {
        this.props.history.push("/");
        this.props.changeLoginState();
        return res.json();
      }
    });
  }
  changeHandler = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value
    });
  };

  showHidePassword = () => {
    const input = document.getElementById("password");
    if (input.type === "password") {
      input.type = "text";
    } else {
      input.type = "password";
    }
  };
  render() {
    const { username, password } = this.state;
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
        <form id="login-form" onSubmit={this.handeSubmitJwtAuth}>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={username.value}
            onChange={this.changeHandler}
            required
          />
          <label>Password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={password.value}
            onChange={this.changeHandler}
            required
          />
        </form>
        <div style={{ marginLeft: "50px" }}>
          <input
            type="checkbox"
            onClick={this.showHidePassword}
            id="checkbox"
          />
          <span style={{ fontSize: "13px" }}>Show password</span>
        </div>
        <button style={loginButton}>Log in</button>
        <section id="help">
          <div id="forgot-password">
            <Link to="/forgot-password">Forgot password? Click here</Link>
          </div>
          <div id="register">
            <Link to="/register">Don't have an account? Sign up</Link>
          </div>
        </section>
        <div id="error">
          {this.state.error ? "Incorrect username or password" : ""}
        </div>
        <div className="push" />
      </div>
    );
  }
}
export default withRouter(LoginForm);
