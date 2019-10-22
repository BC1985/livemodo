import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import "./App.css";
import Navbar from "./NavBar/Navbar";
import Footer from "./Footer/Footer";
import LandingPage from "./LandingPage/LandingPage";
import SignupForm from "./SignupForm/SignupForm";
import BrowseReviewsPage from "./BrowseReviews/BrowseReviewsPage";
import LoginForm from "./LoginPage/LoginPage";
import AddReviewsPage from "./AddReviews/AddReviewsPage";
import ThankYouPage from "./ThankYouPage/ThankYouPage";
import ErrorMessage from "./ErrorMessage/ErrorMessage";
import Calendar from "react-calendar";
import ForgotPassword from "./ForgotPassword/ForgotPassword";
import PasswordConfirmation from "./PasswordConfirmation/PasswodConfirmation";
import SideDrawer from "./SideDrawer/SideDrawer";
import { TokenService } from "./utils/token-service";
require("dotenv").config();

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: TokenService.hasAuthToken(),
      isEmptyState: true,
      isSideDrawerOpen: false
    };
  }
  changeLoginState = () => {
    this.setState({
      ...this.state,
      isLoggedIn: true
    });
  };

  handleLogOut = () => {
    TokenService.clearAuthToken();
    this.drawerToggleClickHandler();
    this.setState({
      isLoggedIn: false
    });
  };
  backdropClickHandler = () => {
    this.setState({
      isSideDrawerOpen: false
    });
  };
  drawerToggleClickHandler = () => {
    this.setState(prevState => {
      return {
        isSideDrawerOpen: !prevState.isSideDrawerOpen
      };
    });
  };

  render() {
    const {
      isLoggedIn,
      userName,
      isEmptyState,
      isNewUser,
      isSideDrawerOpen
    } = this.state;

    const routes = [
      {
        to: "/",
        name: "Home",
        onClick: this.drawerToggleClickHandler
      },
      {
        to: "/browse",
        name: "Browse Reviews",
        onClick: this.drawerToggleClickHandler
      },
      {
        to: "/login",
        name: "Log in",
        onClick: this.drawerToggleClickHandler
      }
    ];
    const authenticateRoutes = [
      {
        to: "/",
        name: "Home",
        onClick: this.drawerToggleClickHandler
      },
      {
        to: "/browse",
        name: "Browse Reviews",
        onClick: this.drawerToggleClickHandler
      },
      {
        to: "/add",
        name: "Add Review",
        onClick: this.drawerToggleClickHandler
      },
      {
        to: "/",
        name: "Log out",
        onClick: this.handleLogOut
      }
    ];
    return (
      <Router>
        <div className="App">
          <SideDrawer
            show={isSideDrawerOpen}
            drawerToggleClickHandler={this.drawerToggleClickHandler}
            routes={isLoggedIn ? authenticateRoutes : routes}
          />
          <Navbar
            isLoggedIn={isLoggedIn}
            routes={isLoggedIn ? authenticateRoutes : routes}
            userName={userName}
            changeLoginState={this.changeLoginState}
            drawerToggleClickHandler={this.drawerToggleClickHandler}
            click={this.drawerToggleClickHandler}
            isSideDrawerOpen={isSideDrawerOpen}
          />
          <Switch>
            <Route
              component={LandingPage}
              exact
              path="/"
              isLoggedIn={isLoggedIn}
              isNewUser={isNewUser}
            />
            <Route path="/thank-you" component={ThankYouPage} />
            <Route component={SignupForm} path="/register" />
            <Route path="/browse" component={BrowseReviewsPage} />
            <LoginForm path="/login" changeLoginState={this.changeLoginState} />
            {isEmptyState && (
              <Route
                component={AddReviewsPage}
                errorMessage={ErrorMessage}
                Calendar={Calendar}
              />
            )}

            <Route path="/forgot-password" component={ForgotPassword} />
            <Redirect from="/forgot-password" to="/confirmation" />
            <Route path="/confirmation" component={PasswordConfirmation} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}
