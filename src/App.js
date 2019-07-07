import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./Navbar";
import "./Navbar.css";
import Footer from "./Footer";
import "./Footer.css";
import LandingPage from "./LandingPage";
import "./LandingPage.css";
import SignupForm from "./SignupForm";
import "./SignupForm.css";
import BrowseReviewsPage from "./BrowseReviewsPage";
import "./BrowseReviewsPage.css";
import LoginPage from "./LoginPage";
import "./LoginPage.css";
import AddReviewsPage from "./AddReviewsPage";
import "./AddReviewsPage.css";
import ThankYouPage from "./ThankYouPage";
import ErrorMessage from "./ErrorMessage";
import Calendar from "react-calendar";
import BrowseForm from "./BrowseForm";
import "./BrowseForm.css";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      isEmptyState: true,
      isLoggedIn: false
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
    const { isLoggedIn } = this.state;
    console.log(isLoggedIn);
    return (
      <Router>
        <div className="App">
          <Navbar isLoggedIn={isLoggedIn} />
          <BrowseForm />
          <Switch>
            {this.state.isThankYouPage && (
              <ThankYouPage thankYouRedirect={this.thankYouRedirect} />
            )}
            <Route
              exact
              path="/"
              component={LandingPage}
              isLoggedIn={isLoggedIn}
            />
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
