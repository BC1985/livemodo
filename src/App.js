import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import LandingPage from "./LandingPage";
import SignupForm from "./SignupForm";
import BrowseReviewsPage from "./BrowseReviewsPage";
import LoginPage from "./LoginPage";
import AddReviewsPage from "./AddReviewsPage";
import ThankYouPage from "./ThankYouPage";
import ErrorMessage from "./ErrorMessage";
import Calendar from "react-calendar";
import BrowseForm from "./BrowseForm";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: true,
      userName: "John",
      isEmptyState: true
    };
  }

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
    const { isLoggedIn, userName } = this.state;
    return (
      <Router>
        <div className="App">
          <Navbar isLoggedIn={isLoggedIn} userName={userName} />
          <BrowseForm />
          <Switch>
            {this.state.isThankYouPage && (
              <ThankYouPage thankYouRedirect={this.thankYouRedirect} />
            )}
            <LandingPage isLoggedIn={isLoggedIn} />
            <Route path="/signup" component={SignupForm} />
            <Route path="/browse" component={BrowseReviewsPage} />
            <Route path="/login" component={LoginPage} />
            {this.state.isEmptyState && (
              <AddReviewsPage
                addReview={this.changeState}
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
