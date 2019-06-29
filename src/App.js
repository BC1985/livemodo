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
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Switch>
            <Route path="/" exact component={LandingPage} />
            <SignupForm path="/signup" component={SignupForm} />
            <BrowseReviewsPage path="/browse" component={BrowseReviewsPage} />
            <LoginForm path="/login" component={LoginForm} />
            <Route path="/add" component={AddReviewsPage} />
            <Route path="/thank-you" component={ThankYouPage} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}
