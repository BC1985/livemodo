import React, { Component } from "react";

class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: true
    };
  }
  render() {
    let linkText = this.state.isLoggedIn ? "Log out" : "Log in";
    return <div>{linkText}</div>;
  }
}

export default LoginComponent;
