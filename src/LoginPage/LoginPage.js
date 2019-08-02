import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import Spinner from "../Spinners/Spinner";
import "./LoginPage.css";
import { TokenService } from "../utils/token-service";
import config from "../config";

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      error: false,
      isLoading: false
    };
  }

  handeSubmitJwtAuth = e => {
    e.preventDefault();
    this.setState({
      isLoading: true
    });
    const { username, password } = e.target;

    TokenService.makeBasicAuthToken(username.value, password.value);

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
    return fetch(`${config.API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(credentials)
    }).then(res => {
      if (!res.ok) {
        this.setState({
          error: true,
          isLoading: false
        });
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
    const isLoading = this.state.isLoading && <Spinner />;
    const error = this.state.error ? "Incorrect username or password" : "";
    const linkStyle = { color: "whiteSmoke" };

    return (
      <div className="login-form-container">
        <main>
          <form id="login-form" onSubmit={this.handeSubmitJwtAuth}>
            <h1
              style={{ color: "whiteSmoke", paddingTop: "0", marginTop: "0" }}
            >
              Log in to Livemodo
            </h1>
            <label>Username</label>
            <input
              style={{ color: "black" }}
              type="text"
              name="username"
              value={username.value}
              onChange={this.changeHandler}
              required
            />
            <label>Password</label>
            <input
              style={{ color: "black" }}
              id="password"
              type="password"
              name="password"
              value={password.value}
              onChange={this.changeHandler}
              required
            />
            <div id="toggle-password">
              <input
                type="checkbox"
                onClick={this.showHidePassword}
                id="checkbox"
              />
              <span id="show-password">Show password</span>
            </div>
            <button id="button">Log in</button>
          </form>
          <section id="help">
            <div id="forgot-password">
              <Link to="/" style={linkStyle}>
                Forgot password?{" "}
              </Link>
            </div>
            <div id="register">
              <Link to="/register" style={linkStyle}>
                Sign up
              </Link>
            </div>
          </section>
          <div id="error">{this.state.isLoading ? isLoading : error}</div>
          <div className="login-push" />
        </main>
      </div>
    );
  }
}
export default withRouter(LoginForm);
