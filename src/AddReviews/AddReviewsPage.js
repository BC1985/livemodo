import React, { Component } from "react";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Calendar from "react-calendar";
import "./AddReviewsPage.css";
import { TokenService } from "../utils/token-service";
import config from "../config";
import { withRouter } from "react-router-dom";
import { validateAddReview, shouldBeError } from "../Validation/validation";
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
      errors: { venue: false, band_name: false, rating: false },
      touched: {
        venue: false,
        band_name: false,
        rating: false
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
    fetch(`${config.API_BASE_URL}/reviews`, {
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
          this.addReview(review);
        });
      })

      .catch(this.setState({ errorMessage: true }));
  };

  addReview = review => {
    this.setState({
      reviews: [...this.state.reviews, review]
    });
    this.props.history.push("/thank-you");
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
    const {
      band_name,
      venue,
      show_date,
      rating,
      touched,
      tagline,
      content,
      value
    } = this.state;
    const errors = validateAddReview(venue, band_name, show_date, rating);
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
              value={tagline}
              onChange={this.changeHandler}
            />

            <label>Name of performer/ band*</label>
            <input
              className={
                shouldBeError("band_name", errors, touched) ? "error" : null
              }
              placeholder="e.g The Hungry Caterpillars"
              name="band_name"
              value={band_name}
              onChange={this.changeHandler}
              onBlur={this.handleBlur("band_name")}
              required
            />

            <label>Name of venue*</label>
            <input
              className={
                shouldBeError("venue", errors, touched) ? "error" : null
              }
              placeholder="e.g Yolanda's Prophylactic Emporium"
              name="venue"
              value={venue}
              onBlur={this.handleBlur("venue")}
              onChange={this.changeHandler}
              required
            />

            <label>Date of performace*</label>
            <div id="calendar">
              <Calendar
                value={value}
                onChange={this.changeShowDate}
                activeStartDate={value}
              />
            </div>
            <label>
              Anything you care to add?{" "}
              <span style={spanStyle}>(optional)</span>
            </label>
            <input
              type="text"
              name="content"
              value={content}
              onChange={this.changeHandler}
            />

            <div id="required-fields">
              <p style={spanStyle}>(* indicates required field)</p>
            </div>
            <label>Rate your experience of the show*</label>
            <div className="ratings">
              <input
                className={
                  shouldBeError("rating", errors, touched) ? "error" : null
                }
                type="number"
                name="rating"
                id="rating"
                min="1"
                max="5"
                value={rating}
                onBlur={this.handleBlur("rating")}
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
export default withRouter(AddReviewsPage);
