import React, { Component } from "react";

export default class LoginComponent extends Component {
  // setLoginState = () => {
  //   const { isLoggedIn } = this.props;
  //   if (!isLoggedIn) {
  //     return "Log in";
  //   }
  // };
  render() {
    return <div>{this.props.children}</div>;
  }
}
