import React, { Component } from "react";
import ErrorMessage from "./ErrorMessage";
// import ThankYouPage from "./ThankYouPage";
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
      showDate: "",
      selectedItem: "",
      showThankYouPage: false,
      errors: { venue: false, bandName: false },
      touched: {
        venue: false,
        bandName: false
      },
      errorMessage: false
    };
  }

  canSubmit = () => {
    const { bandName, venue } = this.state;
    const errors = this.props.validate(venue, bandName);
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    return !isDisabled;
  };

  handleSubmit = e => {
    if (!this.canSubmit()) {
      e.preventDefault();
    }
  };
  changeHandler = e => {
    const name = e.target.name;
    const value = e.target.type === "radio" ? e.target.checked : e.target.value;
    this.setState({
      [name]: value
    });
  };
  checkItem = e => {
    let selectedItem = this.state.selectedItem;
    selectedItem = e.target.checked;
    this.setState({
      selectedItem
    });
  };

  handleBlur = field => e => {
    this.setState({
      touched: { ...this.state.touched, [field]: true }
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
      color: "gray",
      fontStyle: "italic",
      fontSize: "12px"
    };

    return (
      <div>
        <div className="add-review-container">
          <div>
            <h2 id="add-review-header">Add review</h2>
          </div>
          <form onSubmit={this.handleSubmit}>
            <label>
              Add tagline <span style={spanStyle}>(optional)</span>
            </label>
            <section>
              <input
                type="text"
                placeholder="Write a short sentence describing your experiece of the show"
                name="tagline"
                value={this.state.tagline.value}
                onChange={this.changeHandler}
              />
              <label>*Name of performer/ band</label>
              <input
                className={shouldBeError("bandName") ? "error" : ""}
                placeholder="e.g The hungry Caterpillars"
                name="bandName"
                value={this.state.bandName.value}
                onChange={this.changeHandler}
                onBlur={this.handleBlur("bandName")}
                required
              />
              <label>*Name of venue</label>
              <input
                className={shouldBeError("venue") ? "error" : ""}
                placeholder="e.g Yolanda's Prophylactic Emporium"
                name="venue"
                value={this.state.venue.value}
                onBlur={this.handleBlur("venue")}
                onChange={this.changeHandler}
                required
              />
              <label>*Date of performace</label>
              <input
                type="text"
                name="showDate"
                value={this.state.showDate.value}
                onChange={this.changeHandler}
                required
              />
              <p style={spanStyle}>(* indicates required field)</p>
              <div>
                <ErrorMessage />{" "}
              </div>
            </section>
            <label>*Rate your experience</label>
            <section className="radio-buttons">
              <input
                type="radio"
                name="button"
                value="1"
                onChange={this.checkItem}
              />
              1
              <input
                type="radio"
                name="button"
                value="2"
                onChange={this.checkItem}
              />
              2
              <input
                type="radio"
                name="button"
                value="3"
                onChange={this.checkItem}
              />
              3
              <input
                type="radio"
                name="button"
                value="4"
                onChange={this.checkItem}
              />
              4
              <input
                type="radio"
                name="button"
                value="5"
                onChange={this.checkItem}
              />
              5
            </section>

            <button
              type="submit"
              disabled={!isEnabled}
              onClick={this.props.addReview}
            >
              Submit
            </button>
          </form>
        </div>
        <div className="push" />
      </div>
    );
  }
}
export default AddReviewsPage;
