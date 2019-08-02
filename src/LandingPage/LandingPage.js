import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import Button from "../Button/Button";
import "./LandingPage.css";
import { TokenService } from "../utils/token-service";
const landingPageStyle = {
  color: "whiteSmoke"
};
const Description = () => {
  return (
    <div>
      <p style={landingPageStyle} role="contentinfo">
        Have you ever bought a ticket to see your favorite band play live in
        your hometown only to have your experience ruined by the lead singer's
        lack of stage presence? Or maybe you're kicking yourself for missing out
        on catching that unknown band play at the block party right before they
        made it big and now the concert tickets are too expensive... If so, then
        Livemodo is the right tool for any music lover. Houndreds of reviews
        from fellow concertgoers will help you manage your expectations in your
        upcoming concert escapades.
        <br />
        <span
          style={{
            fontWeight: "bold",
            color: "lightGray",
            textDecoration: "underline",
            fontStyle: "italic"
          }}
        >
          To log in with dummy credentials, enter username JohnSmith and
          password JohnSmith1!
        </span>
      </p>
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
        <div className="header" role="banner">
          <h1>Livemodo</h1>
          <h2>Your wiki live shows resource</h2>
        </div>
        <div id="greeting">
          {TokenService.hasAuthToken() ? (
            <div id="welcome">Welcome!</div>
          ) : null}
        </div>

        <div className="description">
          <Description />
        </div>
        <div className="landing-page-push" />
      </div>
    );
  }
}
