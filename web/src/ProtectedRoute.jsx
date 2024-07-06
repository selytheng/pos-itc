import React from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("access_token"); // Check for access token in local storage

  if (!isAuthenticated) {
    return <Navigate to="/signin" />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
