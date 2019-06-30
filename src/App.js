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
import LoginForm from "./LoginPage";
import "./LoginPage.css";
import AddReviewsPage from "./AddReviewsPage";
import "./AddReviewsPage.css";
import ThankYouPage from "./ThankYouPage";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
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
  render() {
    console.log(this.state);
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Switch>
            {this.state.isThankYouPage && <ThankYouPage />}
            <Route path="/" exact component={LandingPage} />
            <Route path="/signup" component={SignupForm} />
            <Route path="/browse" component={BrowseReviewsPage} />
            <Route path="/login" component={LoginForm} />
            {this.state.isEmptyState && (
              <AddReviewsPage addReview={this.changeState} />
            )}
            <Route path="/add" component={AddReviewsPage} />
            />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}
