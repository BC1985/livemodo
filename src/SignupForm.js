import React from "react";

function SignupForm() {
  const spanStyle = {
    color: "gray",
    fontStyle: "italic",
    fontSize: "12px"
  };
  return (
    <>
      <div className="call-to-action">
        <h3>Join the Livemodo community!</h3>
      </div>
      <div className="signup-form">
        <form id="signup">
          <div className="form-text-input">
            <label>*First Name</label>
            <input type="text" placeholder="e.g Tommy" required />
          </div>
          <div className="form-text-input">
            <label>*Last Name</label>
            <input type="text" placeholder="e.g Wisseau" required />
          </div>
          <div className="form-text-input">
            <label>*Username</label>
            <input type="text" required />
          </div>
          <div className="form-text-input">
            <label>*Email</label>
            <input type="text" placeholder="e.g tommy@theroom.com" required />
          </div>
          <div className="form-text-input">
            <label>*Password</label>
            <input type="text" required />
          </div>
          <p style={spanStyle}>(* indicates required field)</p>
          <p>
            Pick the option that best describes your concergoing habits{" "}
            <span style={spanStyle}>(optional)</span>
          </p>
          <div className="form-buttons">
            <div>
              <input type="radio" value="homebody" />
              Homebody
            </div>
            <div>
              <input type="radio" />
              Occasional concertgoer
            </div>
            <div>
              <input type="radio" />
              Concert Connuiseur
            </div>
            <button type="submit">Sign me up!</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default SignupForm;
