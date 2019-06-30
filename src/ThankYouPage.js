import React, { Component } from "react";
// import { Redirect } from "react-router-dom";

export default class ThankYouPage extends Component {
  //   constructor(props) {
  //     super(props);
  //     this.state = {
  //       Redirect: false
  //     };
  //   }

  //   componentDidMount() {
  //     setTimeout(
  //       this.setState({
  //         Redirect: true
  //       }),
  //       3000
  //     );
  //   }
  render() {
    // if (this.state.Redirect) {
    //   return <Redirect to="/" />;
    // }
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
