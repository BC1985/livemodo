import React, { Component, useState } from "react";
import { withRouter, Link } from "react-router-dom";
import Spinner from "../Spinners/Spinner";
import "./LoginPage.css";
import { TokenService } from "../utils/token-service";
import config from "../config";

const LoginForm =(props)=> {
  const [input, setInput] = useState({
    email: "john@smith.com",
    password: "JohnSmith1!",
  });
  const [isLoading, setIsLoading] =useState(false)
  const [error, setError] =useState("")

  const { email, password } = input;

  const handleSubmit=(e)=>{
    setIsLoading(true)
    e.preventDefault()
    postLogin({ email: email.trim().toLowerCase(), password: password.trim() })
  }
   const postLogin=async(credentials)=> {
    const url = `${config.API_BASE_URL}/login`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const data = await res.json();
    
    if (!res.ok) {
      setError(data.error)
      // setError(data)
    } else {
      // get jwt from successful login
      localStorage.setItem("jwt token", data);
      props.history.push("/");
      props.changeLoginState();

    }
  }
  const changeHandler = e => {
    const { name, value } = e.target;
    setInput(input => ({ ...input, [name]: value }));
  };
  const showHidePassword = () => {
    const input = document.getElementById("password");
    if (input.type === "password") {
      input.type = "text";
    } else {
      input.type = "password";
    }
  };


    // isLoading && <Spinner />;
    // error ? "Incorrect email or password" : "";
    const linkStyle = { color: "whiteSmoke" };

    return (
      <div className="login-form-container">
        <main>
          <form id="login-form" onSubmit={handleSubmit}>
            <h1
              style={{ color: "whiteSmoke", paddingTop: "0", marginTop: "0" }}
            >
              Log in to Livemodo
            </h1>
            <label>Email</label>
            <input
              aria-label="email"
              style={{ color: "black" }}
              type="text"
              name="email"
              value={email}
              onChange={changeHandler}
              required
            />
            <label>Password</label>
            <input
              aria-label="password"
              style={{ color: "black" }}
              id="password"
              type="password"
              name="password"
              value={password}
              onChange={changeHandler}
              required
            />
            <div id="toggle-password">
              <input
                aria-label="checkbox"
                type="checkbox"
                onClick={showHidePassword}
                id="checkbox"
              />
              <span id="show-password">Show password</span>
            </div>
            <button id="button">Log in</button>
          </form>
          <p style={{ color: "red", paddingTop: "0", marginTop: "0" }}>{error}</p>
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
          <div id="error">{isLoading ? isLoading : error}</div>
          <div className="login-push" />
        </main>
      </div>
    );
  
}
export default withRouter(LoginForm);
