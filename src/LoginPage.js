import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
// import LandingPage from "./LandingPage";
import "./LoginPage.css";
import AuthApiService from "./services/auth-api-service";
import { TokenService } from "./utils/token-service";

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: ""
    };
  }

  handeSubmitJwtAuth = e => {
    e.preventDefault();
    this.setState({ error: null });
    const { username, password } = e.target;
    AuthApiService.postLogin({
      username: username.value,
      password: password.value
    })
      .then(res => {
        username.value = "";
        password.value = "";
        TokenService.saveAuthToken(res.authToken);
        this.props.onLoginSuccess();
        this.props.history.push("/");
        this.props.changeLoginState();
      })
      .catch(res => {
        this.setState({ error: res.error });
      });
  };

  changeHandler = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value
    });
    console.log(this.state);
  };
  render() {
    const { username, password } = this.state;
    console.log(this.state);
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
          />
          <label>Password</label>
          <input
            type="text"
            name="password"
            value={password.value}
            onChange={this.changeHandler}
          />
          <button style={loginButton}>Log in</button>
        </form>
        <section id="help">
          <div id="forgot-password">
            <Link to="/forgot-password">Forgot password? Click here</Link>
          </div>
          <div id="register">
            <Link to="/register">Don't have an account? Sign up</Link>
          </div>
        </section>
      </div>
    );
  }
}
export default withRouter(LoginForm);
