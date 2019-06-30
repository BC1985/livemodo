import React from "react";

export default function LoginForm() {
  return (
    <div className="login-form-container">
      <section className="login-header">
        <h1>Login to Livemodo</h1>
      </section>
      <form>
        <label>Username</label>
        <input type="text" />
        <label>Password</label>
        <input type="text" />
        <button type="submit">Log in</button>
      </form>
      <section className="forgot-credentials">
        <p>Forgot username/ password? Click here</p>
      </section>
    </div>
  );
}
