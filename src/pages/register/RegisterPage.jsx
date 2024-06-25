import React from "react";
import "../register/RegisterPage.scss";
import logo from "../../assets/images/logo.png";
import sign_pic from "../../assets/images/signup.png";

const SignUp = () => {
  return (
    <div className="signup-container">
      <div className="welcome-section">
        <h1>WELCOME TO T-STORE</h1>
        <img src={sign_pic} alt="Welcome" />
      </div>
      <div className="signup-section">
        <img src={logo} alt="T-Store Logo" className="logo" />
        <h2>Sign Up</h2>
        <form>
          <input type="text" placeholder="Full Name" />
          <input type="text" placeholder="Email or Phone" />
          <input type="password" placeholder="Password" />
          <input type="password" placeholder="Confirm Password" />
          <button type="submit">
            <a href="/dashboard">Sign up</a>
          </button>
        </form>
        <p>If feeling lazy?</p>
        <div className="social-buttons">
          <button className="facebook-button">Facebook</button>
          <button className="google-button">Google</button>
        </div>
        <p>
          Already a member? <a href="/">Sign in</a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
