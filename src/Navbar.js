import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import "./Navbar.css";

// import LoginComponent from "./LoginComponent";

class Navbar extends Component {
  signOut = () => {
    this.props.changeLoginState();
    this.props.history.push("/");
  };
  render() {
    let { isLoggedIn } = this.props;
    const spanStyle = {
      cursor: "pointer"
    };
    return (
      <div className="container">
        <nav className="nav-wrapper">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/add">Add review</NavLink>
          <NavLink to="/browse">Browse reviews</NavLink>
          {isLoggedIn ? (
            <span style={spanStyle} onClick={this.signOut}>
              Log out
            </span>
          ) : null}
        </nav>
      </div>
    );
  }
}

export default withRouter(Navbar);
