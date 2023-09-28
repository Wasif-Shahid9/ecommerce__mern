import React, { Fragment } from "react";
import { useSelector } from "react-redux";

import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isAuthenticated, children }) => {
  // const Navigate = useNavigate();

  if (isAuthenticated === false) {
    return <Navigate to="/login" />;
  }
  return (
    <>
      <div> {children} </div>
    </>
  );
};

export default ProtectedRoute;
