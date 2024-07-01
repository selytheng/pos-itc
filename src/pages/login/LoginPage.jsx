import React, { useState } from "react";
import "../login/LoginPage.scss";
import logo from "../../assets/images/logo.png"; // Adjust the path based on your project structure
import login_pic from "../../assets/images/login.png";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://34.123.7.14/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        // Successful login, store token in local storage
        localStorage.setItem("access_token", data.access_token);
        // Redirect to dashboard or handle login success
        console.log("Login successful");
        window.location.href = "/dashboard";
      } else {
        // Handle login error, display message or redirect
        console.error("Login failed:", data.message);
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="login-container">
      <div className="welcome-section">
        <h1>WELCOME TO T-STORE</h1>
        <img src={login_pic} alt="Welcome" className="welcome-image" />
      </div>
      <div className="login-section">
        <img src={logo} alt="T-Store Logo" className="logo" />
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Email or Phone"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label>
            <input type="checkbox" />
            <span className="me">Remember Me</span>
          </label>
          <button type="submit">Sign in</button>
        </form>
        <p>If Feeling lazy?</p>
        <div className="social-buttons">
          <button className="facebook-button">Facebook</button>
          <button className="google-button">Google</button>
        </div>
        <p>
          I don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
