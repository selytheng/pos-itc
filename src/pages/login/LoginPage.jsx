import React from "react";
import "../login/LoginPage.scss";
import logo from "../../assets/images/logo.png"; // Adjust the path based on your project structure
import logni_pic from "../../assets/images/login.png";
import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <div className="login-container">
      <div className="welcome-section">
        <h1>WELCOME TO T-STORE</h1>
        <img src={logni_pic} alt="Welcome" className="welcome-image" />
      </div>
      <div className="login-section">
        <img src={logo} alt="T-Store Logo" className="logo" />
        <h2>Sign In</h2>
        <form>
          <input type="text" placeholder="Full Name" />
          <input type="text" placeholder="Email or Phone" />
          <input type="password" placeholder="Password" />
          <label>
            <input type="checkbox" />
            <p className="me">Remember Me</p>
          </label>
          {/* <button type="submit">
            <a href="/dashboard">Sign in</a>
          </button> */}
          <Link to="/dashboard">
            <button type="submit">Sign in</button>
          </Link>
        </form>
        <p>If Feeling lazy?</p>
        <div className="social-buttons">
          <button className="facebook-button">Facebook</button>
          <button className="google-button">Google</button>
        </div>
        <p>
          I don't have an account? <a href="/signup">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
