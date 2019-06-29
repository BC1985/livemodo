import React, { Component } from "react";
import { Router } from "react-router-dom";
// import ThankYouPage from "./ThankYouPage";
class addReviewsPage extends Component {
  constructor() {
    super();
    this.state = {
      tagline: "",
      bandName: "",
      venue: "",
      date: "",
      selectedItem: "",
      redirect: false
    };
  }
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
    console.log(this.state);
  };

  handleSubmit = e => {
    e.preventDefault();
    // this.setState({
    //   redirect: true
    // });
  };

  render() {
    // if (this.state.redirect) {
    //   return <Redirect to="/thank-you" component={ThankYouPage} />;
    // }
    const spanStyle = {
      color: "gray",
      fontStyle: "italic",
      fontSize: "12px"
    };

    return (
      <Router>
        <div>
          <div className="add-review-container">
            <div>
              <h2 id="add-review-header">Add review</h2>
            </div>
            <form>
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
                  placeholder="e.g The hungry caterpillars"
                  name="bandName"
                  value={this.state.bandName.value}
                  onChange={this.changeHandler}
                  required
                />
                <label>*Name of venue</label>
                <input
                  placeholder="e.g Yolanda's prophylactic emporium"
                  name="venue"
                  value={this.state.venue.value}
                  onChange={this.changeHandler}
                  required
                />
                <label>*Date of performace</label>
                <input
                  type="text"
                  name="date"
                  value={this.state.date.value}
                  onChange={this.changeHandler}
                  required
                />
                <p style={spanStyle}>(* indicates required field)</p>
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

              <button type="submit" onSubmit={this.handleSubmit}>
                Submit
              </button>
            </form>
          </div>
          <div className="push" />
        </div>
      </Router>
    );
  }
}
export default addReviewsPage;
