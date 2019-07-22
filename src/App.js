import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  NavLink
} from "react-router-dom";
import "./App.css";
import Navbar from "./NavBar/Navbar";
// import Footer from "./Footer/Footer";
import LandingPage from "./LandingPage/LandingPage";
import SignupForm from "./SignupForm/SignupForm";
import BrowseReviewsPage from "./BrowseReviews/BrowseReviewsPage";
import LoginForm from "./LoginPage/LoginPage";
import AddReviewsPage from "./AddReviews/AddReviewsPage";
import ThankYouPage from "./ThankYouPage/ThankYouPage";
import ErrorMessage from "./ErrorMessage";
import Calendar from "react-calendar";
// import BrowseForm from "./BrowseForm/BrowseForm";
import ForgotPassword from "./ForgotPassword/ForgotPassword";
import PasswordConfirmation from "./PasswordConfirmation/PasswodConfirmation";
import SideDrawer from "./SideDrawer/SideDrawer";
import { TokenService } from "./utils/token-service";
import Backdrop from "./Backdrop/Backdrop";
require("dotenv").config();

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      isEmptyState: true,
      sideDrawerOpen: false
    };
  }

  changeLoginState = () => {
    this.setState({
      ...this.state,
      isLoggedIn: true
    });
  };

  changeState = () => {
    this.setState({
      ...this.state,
      isThankYouPage: true
    });
  };
  thankYouRedirect = () => {
    this.setState({
      isThankYouPage: false
    });
  };

  handleLogOut = () => {
    TokenService.clearAuthToken();
    this.drawerToggleClickHandler();
  };
  backdropClickHandler = () => {
    this.setState({
      sideDrawerOpen: false
    });
  };
  drawerToggleClickHandler = () => {
    this.setState(prevState => {
      return {
        sideDrawerOpen: !prevState.sideDrawerOpen
      };
    });
  };

  renderLoggedInLinks = () => {
    return (
      <>
        <li>
          <NavLink to="/add" onClick={this.drawerToggleClickHandler}>
            Add review
          </NavLink>
        </li>
        <li>
          <NavLink to="/" onClick={this.handleLogOut}>
            Log out
          </NavLink>
        </li>
      </>
    );
  };
  render() {
    const {
      isLoggedIn,
      userName,
      isThankYouPage,
      isEmptyState,
      isNewUser
    } = this.state;

    let backdrop;
    if (this.state.sideDrawerOpen) {
      backdrop = <Backdrop click={this.backdropClickHandler} />;
    }
    return (
      <Router>
        {this.state.sideDrawerOpen && (
          <SideDrawer
            show={this.state.sideDrawerOpen}
            renderLoggedInLinks={this.renderLoggedInLinks}
            drawerToggleClickHandler={this.drawerToggleClickHandler}
          />
        )}
        <div className="App">
          <Navbar
            isLoggedIn={isLoggedIn}
            userName={userName}
            changeLoginState={this.changeLoginState}
            drawerToggleClickHandler={this.drawerToggleClickHandler}
            renderLoggedInLinks={this.renderLoggedInLinks}
          />
          {backdrop}
          <Switch>
            <LandingPage
              exact
              path="/"
              isLoggedIn={isLoggedIn}
              isNewUser={isNewUser}
            />
            {isThankYouPage && (
              <ThankYouPage thankYouRedirect={this.thankYouRedirect} />
            )}
            <SignupForm path="/register" changeState={this.changeState} />
            <Route path="/browse" component={BrowseReviewsPage} />
            <LoginForm path="/login" changeLoginState={this.changeLoginState} />
            {isEmptyState && (
              <AddReviewsPage
                changeState={this.changeState}
                errorMessage={ErrorMessage}
                Calendar={Calendar}
              />
            )}

            <Route path="/forgot-password" component={ForgotPassword} />
            <Redirect from="/forgot-password" to="/confirmation" />
            <Route path="/confirmation" component={PasswordConfirmation} />
          </Switch>
          {/* <Footer /> */}
        </div>
      </Router>
    );
  }
}
