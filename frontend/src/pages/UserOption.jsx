import React from "react";
// import { Link } from "react-router-dom";

const UserOption = ({ user }) => {
  if (!user) {
    return;
  }
  console.log(user);
  return (
    <>
      <h1> user option </h1>
    </>
  );
};

export default UserOption;
