import React, { Component } from "react";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
// import ThankYouPage from "./ThankYouPage";
// import Calendar from "react-calendar";
import Calendar from "react-calendar";
import "./AddReviewsPage.css";
import { TokenService } from "../utils/token-service";
import config from "../config";
function validate(venue, band_name, show_date, rating) {
  return {
    band_name: band_name.length === 0,
    venue: venue.length === 0,
    show_date: show_date.length === 0,
    rating: rating.length === 0
  };
}
class AddReviewsPage extends Component {
  constructor() {
    super();
    this.state = {
      reviews: [],
      id: "",
      tagline: "",
      band_name: "",
      venue: "",
      username: "",
      show_date: "",
      posted: "",
      selectedItem: "",
      rating: "",
      content: "",
      showThankYouPage: false,
      errors: { venue: false, band_name: false },
      touched: {
        venue: false,
        band_name: false
      },
      errorMessage: false
    };
  }

  handleSubmit = e => {
    const { id } = this.state;
    e.preventDefault();
    const newReview = {
      id: parseInt(id),
      tagline: this.state.tagline,
      band_name: this.state.band_name,
      venue: this.state.venue,
      username: this.props.username,
      show_date: this.state.show_date,
      posted: new Date(),
      content: this.state.content,
      rating: this.state.rating
    };
    fetch(`${config.API_ENDPOINT}/reviews`, {
      method: "POST",
      body: JSON.stringify(newReview),
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${TokenService.getAuthToken()}`
      }
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(error => Promise.reject(error));
        }
        return res.json().then(review => {
          console.log(
            "review--",
            review,
            "state--",
            this.state,
            "response---",
            res
          );
          this.addReview(review);
        });
      })

      .catch(this.setState({ errorMessage: true }));
  };

  addReview = review => {
    this.setState({
      reviews: [...this.state.reviews, review]
    });
    this.props.changeState();
  };

  ratingChanged(rating) {
    this.setState({
      rating
    });
  }
  changeHandler = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value
    });
  };

  handleBlur = field => e => {
    this.setState({
      touched: { ...this.state.touched, [field]: true },
      ErrorMessage: true
    });
  };

  changeShowDate = value => {
    this.setState({
      show_date: value
    });
  };
  render() {
    const shouldBeError = field => {
      const hasErrors = errors[field];
      const shouldShow = this.state.touched[field];
      return hasErrors ? shouldShow : false;
    };

    const { band_name, venue, show_date, rating } = this.state;
    const errors = validate(venue, band_name, show_date, rating);
    const isEnabled = !Object.keys(errors).some(x => errors[x]);

    const spanStyle = {
      color: "smokewhite",
      fontStyle: "italic"
    };

    return (
      <>
        <div id="add-review-header">
          <h2>Add review</h2>
        </div>
        <div className="add-review-container">
          <div />
          <form id="add-review-form" onSubmit={this.handleSubmit}>
            <label>
              Add tagline <span style={spanStyle}>(optional)</span>
            </label>
            <input
              type="text"
              placeholder="One line to describe your experience"
              name="tagline"
              value={this.state.tagline}
              onChange={this.changeHandler}
            />

            <label>Name of performer/ band*</label>
            <input
              className={shouldBeError("band_name") ? "error" : null}
              placeholder="e.g The Hungry Caterpillars"
              name="band_name"
              value={this.state.band_name}
              onChange={this.changeHandler}
              onBlur={this.handleBlur("band_name")}
              required
            />

            <label>Name of venue*</label>
            <input
              className={shouldBeError("venue") ? "error" : null}
              placeholder="e.g Yolanda's Prophylactic Emporium"
              name="venue"
              value={this.state.venue}
              onBlur={this.handleBlur("venue")}
              onChange={this.changeHandler}
              required
            />

            <label>Date of performace*</label>
            <div id="calendar">
              <Calendar
                value={this.state.value}
                onChange={this.changeShowDate}
                activeStartDate={this.state.value}
              />
            </div>
            <label>
              Anything you care to add?{" "}
              <span style={spanStyle}>(optional)</span>
            </label>
            <input
              type="text"
              name="content"
              value={this.state.content}
              onChange={this.changeHandler}
            />

            <div id="required-fields">
              <p style={spanStyle}>(* indicates required field)</p>
            </div>
            <label>Rate your experience of the show*</label>
            <div className="ratings">
              <input
                type="number"
                name="rating"
                id="rating"
                min="1"
                max="5"
                value={this.state.rating}
                onChange={e => this.ratingChanged(e.target.value)}
              />
            </div>
            <button
              id="submit-review-button"
              type={!isEnabled ? "disabled" : "submit"}
              disabled={!isEnabled}
            >
              Submit
            </button>
          </form>
          <div id="error-message">
            {this.state.errorMessage && <ErrorMessage />}
          </div>
        </div>
        <div className="add-reviews-push" />
      </>
    );
  }
}
export default AddReviewsPage;
