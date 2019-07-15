import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import Button from "./Button";
import "./LandingPage.css";
import { TokenService } from "./utils/token-service";

// import LoginForm from "./LoginPage";
const Description = () => {
  return (
    <div>
      Have you ever bought a ticket to see your favorite band play live in your
      hometown only to have your experience ruined by the lead singer's lack of
      stage presence? Or maybe you're kicking yourself for missing out on
      catching that unknown band play at the block party right before they made
      it big and now the concert tickets are too expensive... If so, then
      Livemodo is the right tool for any music lover. Houndreds of reviews from
      fellow concertgoers will help you manage your expectations in your
      upcoming concert escapades.
    </div>
  );
};

export default class LandingPage extends Component {
  constructor() {
    super();
    this.state = {
      userName: "John"
    };
  }
  redirect = () => {
    this.setState({
      Redirect: true
    });
  };
  UserNotLoggedIn = () => {
    return (
      <Link to="/login">
        <Button id="login-button" onClick={this.redirect}>
          Log in
        </Button>
      </Link>
    );
  };
  render() {
    if (this.state.Redirect) {
      return <Redirect push to="/login" />;
    }
    return (
      <div className="container">
        <div className="header">
          <h1>Livemodo</h1>
          <h3>Your wiki live shows resource</h3>
        </div>
        <div>
          {TokenService.hasAuthToken() ? (
            <div id="welcome">Welcome!</div>
          ) : (
            <Link to="/login">
              <Button>Login</Button>
            </Link>
          )}
        </div>

        <div className="description">
          <Description />
        </div>
      </div>
    );
  }
}
