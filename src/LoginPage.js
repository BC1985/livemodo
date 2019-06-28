import React from "react";

export default function LoginForm() {
  return (
    <div className="login-form-container">
      <h1>Login to Livemodo</h1>
      <form>
        <label>Username</label>
        <input type="text" />
        <label>Password</label>
        <input type="text" />
        <button type="submit">Log in</button>
      </form>
      <div className="forgot-credentials">
        <p>Forgot username/ password? Click here</p>
      </div>
    </div>
  );
}
