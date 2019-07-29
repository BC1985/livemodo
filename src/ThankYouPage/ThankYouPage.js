import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./ThankYouPage.css";
class ThankYouPage extends Component {
  componentDidMount() {
    const redirect = () => {
      this.props.history.push("/");
    };
    setTimeout(redirect, 3000);
  }

  render() {
    return (
      <div className="thank-you-container">
        <div className="hero">
          <h1>Thank You!</h1>
          <div className="redirected">
            <h3>You will be redirected in a few seconds...</h3>
          </div>
        </div>
        <div className="thank-you-push" />
      </div>
    );
  }
}

export default withRouter(ThankYouPage);
