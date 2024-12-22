import React, { useState } from "react";
import "../register/RegisterPage.scss";
import logo from "../../assets/images/logo.png";
import sign_pic from "../../assets/images/signup.png";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [c_password, setC_password] = useState("");
  const role_id = 2;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://pos-api.gic-itc.top/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password, c_password, role_id }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        console.log("Sign Up successful");
        window.location.href = "/";
      } else {
        // Handle login error, display message or redirect
        console.error("Login failed:", data.message);
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="signup-container">
      <div className="welcome-section">
        <h1>WELCOME TO T-STORE</h1>
        <img src={sign_pic} alt="Welcome" />
      </div>
      <div className="signup-section">
        <img src={logo} alt="T-Store Logo" className="logo" />
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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
          <input
            type="password"
            placeholder="Confirm Password"
            value={c_password}
            onChange={(e) => setC_password(e.target.value)}
            required
          />
          <button type="submit">Sign Up</button>
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
