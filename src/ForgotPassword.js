import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
// import PasswordConfirmation from './PasswodConfirmation'

class ForgotPassword extends Component {
  state = {
    Redirect: false
  };

  handleSubmit = () => {
    this.setState({
      Redirect: true
    });
  };
  render() {
    if (this.state.Redirect) {
      return <Redirect to="/confirmation" />;
    }
    return (
      <>
        <h3>Forgot your password? No worries...</h3>
        <label>
          Please enter your email in the box below and we'll send you a link to
          reset your password
        </label>
        <form onSubmit={this.handleSubmit}>
          <input type="text" />
          <button>Submit</button>
        </form>
      </>
    );
  }
}

export default withRouter(ForgotPassword);
