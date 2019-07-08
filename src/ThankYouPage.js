import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./ThankYouPage.css";
// import LandingPage from "./LandingPage";

class ThankYouPage extends Component {
  componentDidMount() {
    const redirect = () => {
      this.props.history.push("/");
      this.props.thankYouRedirect();
    };
    setTimeout(redirect, 9000);
  }

  render() {
    return (
      <>
        <div className="hero">
          <h1>Thank You!</h1>
          <div className="redirected">
            <h3>You will be redirected in a few seconds...</h3>
          </div>
        </div>
        <div className="push" />
      </>
    );
  }
}

export default withRouter(ThankYouPage);
