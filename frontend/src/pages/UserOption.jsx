import React from "react";
import { Link } from "react-router-dom";

const UserOption = ({ user }) => {
  console.log("useroption", user);
  return (
    <div>
      <Link to="/logout"> Logout</Link>
    </div>
  );
};

export default UserOption;
