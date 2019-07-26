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
import IdleService from "./services/idle-service";
import AuthApiService from "./services/auth-api-service";
import Backdrop from "./Backdrop/Backdrop";
require("dotenv").config();

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: TokenService.hasAuthToken(),
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

  handleLogOut = () => {
    TokenService.clearAuthToken();
    TokenService.clearCallbackBeforeExpiry();
    IdleService.unRegisterIdleResets();
    this.drawerToggleClickHandler();
    this.setState({
      isLoggedIn: false
    });
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
  componentDidMount() {
    IdleService.setIdleCallback(this.logoutFromIdle);
    if (TokenService.hasAuthToken()) {
      IdleService.regiserIdleTimerResets();
      TokenService.queueCallbackBeforeExpiry(() => {
        AuthApiService.postRefreshToken();
      });
    }
  }
  componentWillUnmount() {
    IdleService.unRegisterIdleResets();
    TokenService.clearCallbackBeforeExpiry();
  }
  logoutFromIdle = () => {
    TokenService.clearAuthToken();
    TokenService.clearCallbackBeforeExpiry();
    IdleService.unRegisterIdleResets();

    this.forceUpdate();
  };
  render() {
    const { isLoggedIn, userName, isEmptyState, isNewUser } = this.state;

    let backdrop;
    if (this.state.sideDrawerOpen) {
      backdrop = <Backdrop click={this.backdropClickHandler} />;
    }
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
        {this.state.sideDrawerOpen && (
          <SideDrawer
            show={this.state.sideDrawerOpen}
            drawerToggleClickHandler={this.drawerToggleClickHandler}
            routes={isLoggedIn ? authenticateRoutes : routes}
          />
        )}
        <div className="App">
          <Navbar
            isLoggedIn={isLoggedIn}
            routes={isLoggedIn ? authenticateRoutes : routes}
            userName={userName}
            changeLoginState={this.changeLoginState}
            drawerToggleClickHandler={this.drawerToggleClickHandler}
          />
          {backdrop}
          <Switch>
            <LandingPage
              exact
              path="/"
              isLoggedIn={isLoggedIn}
              isNewUser={isNewUser}
            />
            <Route path="/thank-you" component={ThankYouPage} />
            <SignupForm path="/register" />
            <Route path="/browse" component={BrowseReviewsPage} />
            <LoginForm path="/login" changeLoginState={this.changeLoginState} />
            {isEmptyState && (
              <AddReviewsPage errorMessage={ErrorMessage} Calendar={Calendar} />
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
