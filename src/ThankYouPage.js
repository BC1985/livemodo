import React, { Component } from "react";
import { withRouter } from "react-router-dom";
// import LandingPage from "./LandingPage";

class ThankYouPage extends Component {
  componentDidMount() {
    const redirect = () => {
      this.props.history.goBack();
      this.props.thankYouRedirect();
    };
    setTimeout(redirect, 3000);
  }

  render() {
    return (
      <div className="hero">
        <h1>Thank You!</h1>
        <div className="redirected">
          <h3>You will be redirected in a few seconds...</h3>
        </div>
      </div>
    );
  }
}

export default withRouter(ThankYouPage);
