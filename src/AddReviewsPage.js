import React, { Component } from "react";
import ErrorMessage from "./ErrorMessage";
// import ThankYouPage from "./ThankYouPage";
// import Calendar from "react-calendar";
import Calendar from "react-calendar";
import Button from "./Button";
import "./AddReviewsPage.css";

function validate(venue, bandName) {
  return {
    bandName: bandName.length === 0,
    venue: venue.length === 0
  };
}
class AddReviewsPage extends Component {
  constructor() {
    super();
    this.state = {
      tagline: "",
      bandName: "",
      venue: "",
      value: new Date(),
      selectedItem: "",
      selectedItemValue: "",
      showThankYouPage: false,
      errors: { venue: false, bandName: false },
      touched: {
        venue: false,
        bandName: false
      },
      errorMessage: false
    };
  }

  // canSubmit = () => {
  //   const { bandName, venue } = this.state;
  //   const errors = this.props.validate(venue, bandName);
  //   const isDisabled = Object.keys(errors).some(x => errors[x]);
  //   return !isDisabled;
  // };

  handleSubmit = e => {
    e.preventDefault();
    this.props.changeState();
    // if (!this.canSubmit()) {
    //   e.preventDefault();
    // }
  };
  changeHandler = e => {
    const name = e.target.name;
    const value = e.target.type === "radio" ? e.target.checked : e.target.value;
    this.setState({
      [name]: value
    });
  };
  checkItem = e => {
    let { selectedItem, selectedItemValue } = this.state;
    selectedItem = e.target.checked;
    selectedItemValue = e.target.value;
    // selectedItemValue = e.target.value;
    this.setState({
      selectedItem,
      selectedItemValue
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
      value
    });
  };
  render() {
    const shouldBeError = field => {
      const hasErrors = errors[field];
      const shouldShow = this.state.touched[field];
      return hasErrors ? shouldShow : false;
    };

    const { bandName, venue } = this.state;
    const errors = validate(venue, bandName);
    const isEnabled = !Object.keys(errors).some(x => errors[x]);

    const spanStyle = {
      color: "smokewhite",
      fontStyle: "italic",
      fontSize: "12px"
    };

    return (
      <>
        <div id="add-review-header">
          <h2>Add review</h2>
        </div>
        <div className="add-review-container">
          <div />
          <form id="add-review-form" onSubmit={this.handleSubmit}>
            <div id="show-information">
              <label>
                Add tagline <span style={spanStyle}>(optional)</span>
              </label>
              <input
                type="text"
                placeholder="Write a short sentence describing your experiece of the show"
                name="tagline"
                value={this.state.tagline}
                onChange={this.changeHandler}
              />

              <label>Name of performer/ band*</label>
              <input
                className={shouldBeError("bandName") ? "error" : null}
                placeholder="e.g The Hungry Caterpillars"
                name="bandName"
                value={this.state.bandName}
                onChange={this.changeHandler}
                onBlur={this.handleBlur("bandName")}
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
            </div>
            <div id="calendar">
              <label>Date of performace*</label>
              <Calendar
                value={this.state.value}
                onChange={this.changeShowDate}
              />
            </div>
            {/* <input
                type="text"
                name="date"
                value={this.state.date.value}
                onChange={this.changeHandler}
                required
              /> */}
            <div id="required-fields">
              <p style={spanStyle}>(* indicates required field)</p>
            </div>

            <div id="error-message">
              {this.state.errorMessage && <ErrorMessage />}
            </div>

            <label>Rate your experience of the show*</label>
            <div id="radio-buttons">
              1
              <input
                type="radio"
                name="button"
                value="1"
                onChange={this.checkItem}
              />
              2
              <input
                type="radio"
                name="button"
                value="2"
                onChange={this.checkItem}
              />
              3
              <input
                type="radio"
                name="button"
                value="3"
                onChange={this.checkItem}
              />
              4
              <input
                type="radio"
                name="button"
                value="4"
                onChange={this.checkItem}
              />
              5
              <input
                type="radio"
                name="button"
                value="5"
                onChange={this.checkItem}
              />
            </div>

            <Button
              type="submit"
              disabled={!isEnabled}
              // onClick={this.props.changeState}
            >
              Submit
            </Button>
          </form>
        </div>
        <div className="push" />
      </>
    );
  }
}
export default AddReviewsPage;
