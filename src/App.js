import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import "./App.css";
import Navbar from "./NavBar/Navbar";
import LandingPage from "./LandingPage/LandingPage";
import SignupForm from "./SignupForm/SignupForm";
import BrowseReviewsPage from "./BrowseReviews/BrowseReviewsPage";
import LoginForm from "./LoginPage/LoginPage";
import AddReviewsPage from "./AddReviews/AddReviewsPage";
import ThankYouPage from "./ThankYouPage/ThankYouPage";
import ForgotPassword from "./ForgotPassword/ForgotPassword";
import PasswordConfirmation from "./PasswordConfirmation/PasswodConfirmation";
import { TokenService } from "./utils/token-service";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
require("dotenv").config();

function App() {
  const [isLoggedIn, setIsloggedIn] = useState(TokenService.hasAuthToken());
  const [isSideDrawerOpen, setIsSideDrawerOpen] = useState(false);

  const changeLoginState = () => {
    setIsloggedIn(state => !state);
  };

  const handleLogOut = () => {
    TokenService.clearAuthToken();
    drawerToggleClickHandler();
    setIsloggedIn(false);
  };
  const drawerToggleClickHandler = () => {
    setIsSideDrawerOpen(state => !state);
  };
  const loginProps = {
    isLoggedIn,
    changeLoginState
  };
  const routes = [
    {
      to: "/",
      name: "Home",
    },
    {
      to: "/reviews",
      name: "Reviews",
    },
    {
      to: "/login",
      name: "Log in",
    },
  ];
  const authenticateRoutes = [
    {
      to: "/",
      name: "Home",
    },
    {
      to: "/reviews",
      name: "Reviews",
    },
    {
      to: "/post",
      name: "Add Review",
    },
    {
      to: "/",
      name: "Log out",
      onClick: handleLogOut,
    },
  ];
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Router>
        <div className="App">
          <Navbar
            isLoggedIn={isLoggedIn}
            authenticateRoutes={authenticateRoutes}
            routes={routes}
            changeLoginState={changeLoginState}
          />
          <Switch>
            <Route
              exact
              path="/"
              render={props => <LandingPage {...props} {...loginProps} />}
            />
            <Route path="/thank-you" component={ThankYouPage} />
            <Route
              path="/register"
              render={props => <SignupForm {...props} {...loginProps} />}
            />
            <Route path="/reviews" component={BrowseReviewsPage} />
            <Route
              path="/login"
              render={props => <LoginForm {...props} {...loginProps} />}
            />
            <Route
              path="/post"
              render={props => <AddReviewsPage {...props} {...loginProps} />}
            />

            <Route path="/forgot-password" component={ForgotPassword} />
            <Redirect from="/forgot-password" to="/confirmation" />
            <Route path="/confirmation" component={PasswordConfirmation} />
          </Switch>
        </div>
      </Router>
    </MuiPickersUtilsProvider>
  );
}
export default App;
