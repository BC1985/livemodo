import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import LandingPage from "./LandingPage";
import SignupForm from "./SignupForm";
import BrowseReviewsPage from "./BrowseReviewsPage";
import LoginForm from "./LoginPage";
import AddReviewsPage from "./AddReviewsPage";
import ThankYouPage from "./ThankYouPage";
import ErrorMessage from "./ErrorMessage";
import Calendar from "react-calendar";
import BrowseForm from "./BrowseForm";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      userName: "John",
      isEmptyState: true
    };
  }

  changeLoginState = () => {
    !this.state.isLoggedIn
      ? this.setState({
          ...this.state,
          isLoggedIn: true
        })
      : this.setState({
          ...this.state,
          isLoggedIn: false
        });
  };

  logOut = () => {
    this.setState({
      ...this.state,
      isLoggedIn: false
    });
  };
  changeState = () => {
    this.setState({
      ...this.state,
      isEmptyState: false,
      isThankYouPage: true
    });
  };
  thankYouRedirect = () => {
    this.setState({
      isThankYouPage: false
    });
  };
  render() {
    const {
      isLoggedIn,
      userName,
      isThankYouPage,
      isEmptyState,
      isNewUser
    } = this.state;
    console.log(this.state.isLoggedIn);

    return (
      <Router>
        <div className="App">
          <Navbar
            isLoggedIn={isLoggedIn}
            userName={userName}
            changeLoginState={this.changeLoginState}
          />
          <BrowseForm />
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
            <Route path="/add" component={AddReviewsPage} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}
